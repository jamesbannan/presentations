
$azureResourceGroup = Get-AzureRmResourceGroup -Name 'ignite-infra'
$shardingDeploymentName = 'msauignite-sharding'

New-AzureRmResourceGroupDeployment `
    -Name $shardingDeploymentName `
    -ResourceGroupName $AzureResourceGroup.ResourceGroupName `
    -TemplateFile demoLinuxVM.json `
    -Verbose -Force