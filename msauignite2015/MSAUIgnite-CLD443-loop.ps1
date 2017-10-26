$azureResourceGroupName = 'msauignite-loop'
$azureResourceGroup = New-AzureRmResourceGroup `
    -Name $azureResourceGroupName `
    -Location 'Australia East'

$shardingDeploymentName = 'msauignite-demo-loop'

New-AzureRmResourceGroupDeployment `
    -Name $shardingDeploymentName `
    -ResourceGroupName $AzureResourceGroup.ResourceGroupName `
    -TemplateFile demoLinuxVM.json `
    -Verbose -Force
