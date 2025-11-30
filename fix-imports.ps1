# Fix React Import Issues Script
Write-Host "Fixing React import issues..." -ForegroundColor Yellow

$files = Get-ChildItem -Path "." -Recurse -Include "*.tsx" | Where-Object { $_.Name -ne "fix-imports.ps1" }

$fixedCount = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Pattern 1: Fix separate React and useState imports
    if ($content -match "import React from 'react'`r?`nimport \{.*useState.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fixedCount++
        Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
    }
    
    # Pattern 2: Fix separate React and useEffect imports
    if ($content -match "import React from 'react'`r?`nimport \{.*useEffect.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fixedCount++
        Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
    }
    
    # Pattern 3: Fix separate React and useRef imports
    if ($content -match "import React from 'react'`r?`nimport \{.*useRef.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fixedCount++
        Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
    }
    
    # Save if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    }
}

Write-Host "Done! Fixed $fixedCount files" -ForegroundColor Green
