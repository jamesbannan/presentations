## Register Microsoft.Network providers with subscription

Register-AzureRmProviderFeature –ProviderNamespace Microsoft.Network
$networkFeatures = Get-AzureRmProviderFeature -ListAvailable | `
    Where-Object {$_.ProviderName -eq 'Microsoft.Network'}
foreach($networkFeature in $networkFeatures){
    Register-AzureRmProviderFeature -ProviderNamespace Microsoft.Network -FeatureName $networkFeature.FeatureName -Force
}
Get-AzureRmProviderFeature -ListAvailable

## Create Azure Resource Group

$tmResourceGroupName = 'msauignite-tm'
New-AzureRmResourceGroup -Name $tmResourceGroupName -Location 'Australia East'
$tmResourceGroup = Get-AzureRmResourceGroup -Name $tmResourceGroupName

## Create Traffic Manager Profile

$tmProfileName = 'msauignitelb'
$tmprofile = New-AzureRmTrafficManagerProfile –Name $tmProfileName `
    -ResourceGroupName $tmResourceGroup.ResourceGroupName `
    -TrafficRoutingMethod Performance `
    -RelativeDnsName msauignite `
    -Ttl 30 `
    -MonitorProtocol HTTP `
    -MonitorPort 80 `
    -MonitorPath '/'

### Add Endpoints to the Traffic Manager Profile

Add-AzureRmTrafficManagerEndpointConfig `
    –EndpointName chef-demo-1 `
    –TrafficManagerProfile $tmprofile `
    –Type ExternalEndpoints `
    –Target steam-chef-win-1.westus.cloudapp.azure.com `
    –EndpointStatus Enabled `
    –Weight 10 `
    –Priority 1 `
    –EndpointLocation 'West US'

Add-AzureRmTrafficManagerEndpointConfig `
    –EndpointName chef-demo-2 `
    –TrafficManagerProfile $tmprofile `
    –Type ExternalEndpoints `
    –Target steam-chef-win-2.westus.cloudapp.azure.com `
    –EndpointStatus Enabled `
    –Weight 10 `
    –Priority 2 `
    –EndpointLocation 'West US'

Set-AzureRmTrafficManagerProfile –TrafficManagerProfile $tmprofile