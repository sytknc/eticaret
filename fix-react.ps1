# React Import Fix Script
Write-Host "Fixing React imports..." -ForegroundColor Green

# TSX dosyalarini bul
$tsxFiles = Get-ChildItem -Path . -Recurse -Filter "*.tsx" | Where-Object { $_.FullName -notlike "*node_modules*" }

$fixedCount = 0

foreach ($file in $tsxFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Duplicate React import'larini temizle
    if ($content -match "import React from 'react'`nimport React from 'react'") {
        $content = $content -replace "import React from 'react'`nimport React from 'react'", "import React from 'react'"
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Fixed duplicate: $($file.Name)" -ForegroundColor Yellow
        $fixedCount++
    }
    
    # React import'u yoksa ve hooks varsa ekle
    $hasReactImport = $content -match "import React from 'react'"
    $hasHooks = $content -match "useState|useEffect|useRef|useRouter|useCart"
    
    if ($hasHooks -and -not $hasReactImport) {
        $lines = $content -split "`n"
        $firstImportIndex = -1
        
        for ($i = 0; $i -lt $lines.Count; $i++) {
            if ($lines[$i] -match "^import ") {
                $firstImportIndex = $i
                break
            }
        }
        
        if ($firstImportIndex -ge 0) {
            $lines[$firstImportIndex] = "import React from 'react'`n" + $lines[$firstImportIndex]
            $content = $lines -join "`n"
            Set-Content -Path $file.FullName -Value $content -NoNewline
            Write-Host "Added React import: $($file.Name)" -ForegroundColor Cyan
            $fixedCount++
        }
    }
}

Write-Host "Done! Fixed $fixedCount files" -ForegroundColor Green
