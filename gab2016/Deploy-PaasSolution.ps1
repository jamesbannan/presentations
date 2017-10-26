### Define variables
$location = 'Australia Southeast'
$resourceGroupName = 'gab2016-arm-paas'
$resourceDeploymentName = 'gab2016-arm-paas-deployment'
$templatePath = $env:USERPROFILE + '\Documents\git\presentations\gab2016'
$templateFile = 'paasDeploy_v2.json'
$template = $templatePath + '\' + $templateFile

$locations = @( `
    'East US', `
    'West Europe', `
    'Southeast Asia', `
    'Australia Southeast'
    )

### Define additional template parameters
$additionalParameters = New-Object -TypeName Hashtable
$additionalParameters['webAppLocation'] = $locations

### Create Resource Group
New-AzureRmResourceGroup `
    -Name $resourceGroupName `
    -Location $Location `
    -Verbose -Force

### Deploy Resources
New-AzureRmResourceGroupDeployment `
    -Name $resourceDeploymentName `
    -ResourceGroupName $resourceGroupName `
    -TemplateFile $template `
    @additionalParameters `
    -Verbose -Force