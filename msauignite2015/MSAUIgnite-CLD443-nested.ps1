$azureResourceGroupName = 'msauignite-nested'
$azureResourceGroup = New-AzureRmResourceGroup `
    -Name $azureResourceGroupName `
    -Location 'Australia East'

New-AzureRmResourceGroupDeployment `
    -Name 'msauignite-nested-demo' `
    -ResourceGroupName $azureResourceGroup.ResourceGroupName `
    -TemplateFile demoNest.json `
    -TemplateParameterFile demoNest.parameters.json `
    -Verbose -Force