/**
 * GitHub Repository Code Fetcher
 * Fetches code from GitHub repositories for analysis
 */

interface GitHubFile {
  name: string;
  path: string;
  content?: string;
  type: 'file' | 'dir';
}

/**
 * Extract owner and repo from GitHub URL
 */
function parseGitHubUrl(url: string): { owner: string; repo: string; branch?: string } | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    if (pathParts.length < 2) return null;
    
    return {
      owner: pathParts[0],
      repo: pathParts[1].replace('.git', ''),
      branch: pathParts[3] === 'tree' ? pathParts[4] : 'main'
    };
  } catch {
    return null;
  }
}

/**
 * Fetch repository contents from GitHub API
 */
export async function fetchGitHubRepository(githubUrl: string): Promise<string> {
  console.log('📦 Fetching GitHub repository:', githubUrl);
  
  const parsed = parseGitHubUrl(githubUrl);
  if (!parsed) {
    throw new Error('Invalid GitHub URL. Expected format: https://github.com/owner/repo');
  }

  const { owner, repo, branch = 'main' } = parsed;
  console.log(`📂 Repository: ${owner}/${repo}, Branch: ${branch}`);

  try {
    // Fetch repository tree
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
    console.log('🌐 Fetching from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Fortify-Security-Analysis'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository not found or branch '${branch}' does not exist. Try using 'main' or 'master' branch.`);
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const tree = data.tree || [];
    
    console.log(`📊 Found ${tree.length} files in repository`);

    // Filter for code files only (exclude common non-code files)
    const codeExtensions = [
      '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.go', '.rb', '.php',
      '.c', '.cpp', '.h', '.cs', '.swift', '.kt', '.rs', '.scala',
      '.sql', '.sh', '.bash', '.yaml', '.yml', '.json', '.xml'
    ];

    const codeFiles = tree.filter((item: any) => {
      if (item.type !== 'blob') return false;
      const ext = item.path.substring(item.path.lastIndexOf('.'));
      return codeExtensions.includes(ext);
    });

    console.log(`✅ Found ${codeFiles.length} code files`);

    // Fetch content of up to 50 files (to avoid rate limits and huge payloads)
    const filesToFetch = codeFiles.slice(0, 50);
    const fileContents: string[] = [];

    for (const file of filesToFetch) {
      try {
        const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${file.path}?ref=${branch}`;
        const fileResponse = await fetch(fileUrl, {
          headers: {
            'Accept': 'application/vnd.github.v3.raw',
            'User-Agent': 'Fortify-Security-Analysis'
          }
        });

        if (fileResponse.ok) {
          const content = await fileResponse.text();
          fileContents.push(`\n\n// ========== FILE: ${file.path} ==========\n${content}`);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to fetch ${file.path}:`, error);
      }
    }

    if (fileContents.length === 0) {
      throw new Error('No code files could be fetched from the repository');
    }

    const combinedCode = `// GitHub Repository: ${owner}/${repo}\n// Branch: ${branch}\n// Files analyzed: ${fileContents.length}\n${fileContents.join('\n')}`;
    
    console.log(`✅ Successfully fetched ${fileContents.length} files, total size: ${combinedCode.length} characters`);
    
    return combinedCode;
  } catch (error) {
    console.error('❌ GitHub fetch error:', error);
    throw error;
  }
}

/**
 * Check if a string is a GitHub URL
 */
export function isGitHubUrl(input: string): boolean {
  try {
    const url = new URL(input);
    return url.hostname === 'github.com' && url.pathname.split('/').filter(Boolean).length >= 2;
  } catch {
    return false;
  }
}
