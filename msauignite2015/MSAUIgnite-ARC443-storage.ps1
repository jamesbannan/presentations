### Storage Accounts
### Get Azure Resource Group
$azureResourceGroup = Get-AzureRmResourceGroup -Name 'ignite-infra'

$azureStorageAccountPrefix = 'msauignite2015'

### New LRS Storage Account
$azureLRSStorageAccountName = $azureStorageAccountPrefix + 'lrs'
$azureLRSStorageAccount = New-AzureRmStorageAccount `
    -ResourceGroupName $azureResourceGroup.ResourceGroupName `
    -Name $azureLRSStorageAccountName `
    -Type Standard_LRS `
    -Location $azureResourceGroup.Location `
    -Verbose

### New ZRS Storage Account
$azureZRSStorageAccountName = $azureStorageAccountPrefix + 'zrs'
$azureZRSStorageAccount = New-AzureRmStorageAccount `
    -ResourceGroupName $azureResourceGroup.ResourceGroupName `
    -Name $azureZRSStorageAccountName `
    -Type Standard_ZRS `
    -Location $azureResourceGroup.Location `
    -Verbose

### New GRS Storage Account
$azureGRSStorageAccountName = $azureStorageAccountPrefix + 'grs'
$azureGRSStorageAccount = New-AzureRmStorageAccount `
    -ResourceGroupName $azureResourceGroup.ResourceGroupName `
    -Name $azureGRSStorageAccountName `
    -Type Standard_GRS `
    -Location $azureResourceGroup.Location `
    -Verbose
Clear-Host
Get-AzureRmStorageAccount `
    -ResourceGroupName $AzureResourceGroup.ResourceGroupName | `
    Select-Object ResourceGroupName,StorageAccountName,AccountType
$azureGRSStorageAccount | Select-Object StorageAccountName,PrimaryLocation,StatusOfPrimary,PrimaryEndpoints,SecondaryLocation,StatusOfSecondary,SecondaryEndpoints

### New RAGRS Storage Account
$azureRAGRSStorageAccountName = $azureStorageAccountPrefix + 'ragrs'
$azureRAGRSStorageAccount = New-AzureRmStorageAccount `
    -ResourceGroupName $azureResourceGroup.ResourceGroupName `
    -Name $azureRAGRSStorageAccountName `
    -Type Standard_RAGRS `
    -Location $azureResourceGroup.Location `
    -Verbose
Clear-Host
Get-AzureRmStorageAccount `
    -ResourceGroupName $AzureResourceGroup.ResourceGroupName | `
    Select-Object ResourceGroupName,StorageAccountName,AccountType
$azureRAGRSStorageAccount | Select-Object StorageAccountName,PrimaryLocation,StatusOfPrimary,PrimaryEndpoints,SecondaryLocation,StatusOfSecondary,SecondaryEndpoints