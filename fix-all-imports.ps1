# Comprehensive React Import Fix Script
Write-Host "Fixing all React import issues..." -ForegroundColor Yellow

$files = Get-ChildItem -Path "." -Recurse -Include "*.tsx" | Where-Object { 
    $_.Name -notin @("fix-all-imports.ps1", "fix-imports.ps1", "fix-react.ps1", "fix-react-imports.ps1") 
}

$fixedCount = 0
$totalFiles = $files.Count

Write-Host "Found $totalFiles TypeScript files to check" -ForegroundColor Cyan

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileFixed = $false
    
    Write-Host "Checking: $($file.Name)" -ForegroundColor Gray
    
    # Pattern 1: Fix separate React and useState imports
    if ($content -match "import React from 'react'`r?`nimport \{.*useState.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fileFixed = $true
        Write-Host "  Fixed useState import" -ForegroundColor Green
    }
    
    # Pattern 2: Fix separate React and useEffect imports
    if ($content -match "import React from 'react'`r?`nimport \{.*useEffect.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fileFixed = $true
        Write-Host "  Fixed useEffect import" -ForegroundColor Green
    }
    
    # Pattern 3: Fix separate React and useRef imports
    if ($content -match "import React from 'react'`r?`nimport \{.*useRef.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fileFixed = $true
        Write-Host "  Fixed useRef import" -ForegroundColor Green
    }
    
    # Pattern 4: Fix separate React and useCallback imports
    if ($content -match "import React from 'react'`r?`nimport \{.*useCallback.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fileFixed = $true
        Write-Host "  Fixed useCallback import" -ForegroundColor Green
    }
    
    # Pattern 5: Fix separate React and useMemo imports
    if ($content -match "import React from 'react'`r?`nimport \{.*useMemo.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fileFixed = $true
        Write-Host "  Fixed useMemo import" -ForegroundColor Green
    }
    
    # Pattern 6: Fix separate React and useReducer imports
    if ($content -match "import React from 'react'`r?`nimport \{.*useReducer.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fileFixed = $true
        Write-Host "  Fixed useReducer import" -ForegroundColor Green
    }
    
    # Pattern 7: Fix separate React and useContext imports
    if ($content -match "import React from 'react'`r?`nimport \{.*useContext.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fileFixed = $true
        Write-Host "  Fixed useContext import" -ForegroundColor Green
    }
    
    # Pattern 8: Fix multiple separate imports (more complex pattern)
    if ($content -match "import React from 'react'`r?`nimport \{.*useState.*useEffect.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fileFixed = $true
        Write-Host "  Fixed multiple hooks import" -ForegroundColor Green
    }
    
    # Pattern 9: Fix separate React and createContext imports
    if ($content -match "import React from 'react'`r?`nimport \{.*createContext.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fileFixed = $true
        Write-Host "  Fixed createContext import" -ForegroundColor Green
    }
    
    # Pattern 10: Fix separate React and ReactNode imports
    if ($content -match "import React from 'react'`r?`nimport \{.*ReactNode.*\} from 'react'") {
        $content = $content -replace "import React from 'react'`r?`nimport \{([^}]+)\} from 'react'", "import React, { `$1 } from 'react'"
        $fileFixed = $true
        Write-Host "  Fixed ReactNode import" -ForegroundColor Green
    }
    
    # Save if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        $fixedCount++
        Write-Host "  Saved changes" -ForegroundColor Blue
    }
    
    if (-not $fileFixed) {
        Write-Host "  No changes needed" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Script completed!" -ForegroundColor Green
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "   Total files checked: $totalFiles" -ForegroundColor White
Write-Host "   Files fixed: $fixedCount" -ForegroundColor White
Write-Host "   Files unchanged: $($totalFiles - $fixedCount)" -ForegroundColor White

if ($fixedCount -gt 0) {
    Write-Host ""
    Write-Host "All React import issues have been fixed!" -ForegroundColor Green
    Write-Host "You can now run 'npm run dev' to start the development server." -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "No import issues found. All files are already correct!" -ForegroundColor Blue
}
