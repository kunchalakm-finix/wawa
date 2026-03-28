$bom = [byte[]](0xEF,0xBB,0xBF)
$content = Get-Content -Path "C:\Users\Nitchapat\Downloads\case3-ร้านกาแฟ\KPI_Coffee_Shop.csv" -Raw -Encoding UTF8
$fs = [System.IO.File]::Create("C:\Users\Nitchapat\Downloads\case3-ร้านกาแฟ\KPI_Coffee_Shop_UTF8BOM.csv")
$fs.Write($bom, 0, $bom.Length)
$writer = New-Object System.IO.StreamWriter($fs, [System.Text.Encoding]::UTF8)
$writer.Write($content)
$writer.Close()
$fs.Close()
