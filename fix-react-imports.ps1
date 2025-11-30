# React Import Fix Script
# Bu script tüm TSX dosyalarında React import'larını düzeltir

Write-Host "🔧 React Import Düzeltme Script'i Başlatılıyor..." -ForegroundColor Green

# TSX dosyalarını bul
$tsxFiles = Get-ChildItem -Path . -Recurse -Filter "*.tsx" | Where-Object { $_.FullName -notlike "*node_modules*" }

$fixedCount = 0

foreach ($file in $tsxFiles) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # React import'u var mı kontrol et
    $hasReactImport = $content -match "import React from 'react'"
    $hasUseState = $content -match "useState"
    $hasUseEffect = $content -match "useEffect"
    $hasUseRef = $content -match "useRef"
    $hasUseRouter = $content -match "useRouter"
    $hasUseCart = $content -match "useCart"
    
    # Hooks kullanılıyor ama React import'u yoksa ekle
    if (($hasUseState -or $hasUseEffect -or $hasUseRef -or $hasUseRouter -or $hasUseCart) -and -not $hasReactImport) {
        # İlk import satırını bul
        $lines = $content -split "`n"
        $firstImportIndex = -1
        
        for ($i = 0; $i -lt $lines.Count; $i++) {
            if ($lines[$i] -match "^import ") {
                $firstImportIndex = $i
                break
            }
        }
        
        if ($firstImportIndex -ge 0) {
            # React import'unu ekle
            $lines[$firstImportIndex] = "import React from 'react'`n" + $lines[$firstImportIndex]
            $content = $lines -join "`n"
            
            # Dosyayı güncelle
            Set-Content -Path $file.FullName -Value $content -NoNewline
            
            Write-Host "✅ Düzeltildi: $($file.Name)" -ForegroundColor Yellow
            $fixedCount++
        }
    }
    
    # Duplicate React import'larını temizle
    if ($content -match "import React from 'react'`nimport React from 'react'") {
        $content = $content -replace "import React from 'react'`nimport React from 'react'", "import React from 'react'"
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "🧹 Duplicate temizlendi: $($file.Name)" -ForegroundColor Cyan
    }
}

Write-Host "`n🎉 İşlem Tamamlandı!" -ForegroundColor Green
Write-Host "📊 Toplam düzeltilen dosya: $fixedCount" -ForegroundColor Blue
Write-Host "`n🚀 Development server'ı yeniden başlatın: npm run dev" -ForegroundColor Magenta
