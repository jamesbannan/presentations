## Create Azure Resource Group

$lbResourceGroupName = 'msauignite-lb'
New-AzureRmResourceGroup -Name $lbResourceGroupName -Location 'Australia East'
$lbResourceGroup = Get-AzureRmResourceGroup -Name $lbResourceGroupName

## Create Virtual Network & Public IP

$lbBackendSubnet = New-AzureRmVirtualNetworkSubnetConfig `
    -Name LB-Subnet-BE `
    -AddressPrefix 10.0.2.0/24

$lbVnetName = 'msauignite-lb-vnet'

New-AzureRmVirtualNetwork `
    -Name $lbVnetName `
    -ResourceGroupName $lbResourceGroup.ResourceGroupName `
    -Location $lbResourceGroup.Location `
    -AddressPrefix 10.0.0.0/16 `
    -Subnet $lbBackendSubnet

$lbPublicIpName = 'msauignite-ip'

$lbPublicIP = New-AzureRmPublicIpAddress `
    -Name $lbPublicIpName `
    -ResourceGroupName $lbResourceGroup.ResourceGroupName `
    -Location $lbResourceGroup.Location `
    –AllocationMethod Dynamic `
    -DomainNameLabel msauignite-lbip 

## Create front-end IP pool & back-end address pool

$lbFrontEndIP = New-AzureRmLoadBalancerFrontendIpConfig `
    -Name LB-Frontend `
    -PublicIpAddress $lbPublicIP 

$lbBackEndAddressPool= New-AzureRmLoadBalancerBackendAddressPoolConfig -Name 'LB-backend'

## Create rules, NAT, probe & LB

$inboundNATRule1= New-AzureRmLoadBalancerInboundNatRuleConfig `
    -Name 'RDP1' `
    -FrontendIpConfiguration $lbFrontEndIP `
    -Protocol TCP `
    -FrontendPort 3441 `
    -BackendPort 3389

$inboundNATRule2= New-AzureRmLoadBalancerInboundNatRuleConfig `
    -Name 'RDP2' `
    -FrontendIpConfiguration $lbFrontEndIP `
    -Protocol TCP `
    -FrontendPort 3442 `
    -BackendPort 3389

$lbHealthProbe = New-AzureRmLoadBalancerProbeConfig `
    -Name 'HealthProbe' `
    -RequestPath 'Customers.aspx' `
    -Protocol http `
    -Port 80 `
    -IntervalInSeconds 15 `
    -ProbeCount 2

$lbRule = New-AzureRmLoadBalancerRuleConfig `
    -Name 'HTTP' `
    -FrontendIpConfiguration $lbFrontEndIP `
    -BackendAddressPool $lbBackEndAddressPool `
    -Probe $lbHealthProbe `
    -Protocol Tcp `
    -FrontendPort 80 `
    -BackendPort 80

$NRPLB = New-AzureRmLoadBalancer `
    -ResourceGroupName $lbResourceGroup.ResourceGroupName `
    -Name 'NRP-LB' `
    -Location $lbResourceGroup.Location `
    -FrontendIpConfiguration $lbFrontEndIP `
    -InboundNatRule $inboundNATRule1,$inboundNatRule2 `
    -LoadBalancingRule $lbrule `
    -BackendAddressPool $lbBackEndAddressPool `
    -Probe $lbHealthProbe 

## Get Virtual Network Details

$vnet = Get-AzureRmVirtualNetwork `
    -Name $lbVnetName `
    -ResourceGroupName $lbResourceGroup.ResourceGroupName

$backendSubnet = Get-AzureRmVirtualNetworkSubnetConfig -Name LB-Subnet-BE -VirtualNetwork $vnet 

$lbBackEndNic1= New-AzureRmNetworkInterface `
    -ResourceGroupName $lbResourceGroup.ResourceGroupName `
    -Name 'lb-nic1-be' `
    -Location $lbResourceGroup.Location `
    -PrivateIpAddress '10.0.2.6' `
    -Subnet $lbBackendSubnet `
    -LoadBalancerBackendAddressPool $nrplb.BackendAddressPools[0] `
    -LoadBalancerInboundNatRule $nrplb.InboundNatRules[0]

$lbBackEndNic2= New-AzureRmNetworkInterface `
    -ResourceGroupName $lbResourceGroup.ResourceGroupName `
    -Name 'lb-nic2-be' `
    -Location $lbResourceGroup.Location `
    -PrivateIpAddress '10.0.2.7' `
    -Subnet $lbBackendSubnet `
    -LoadBalancerBackendAddressPool $nrplb.BackendAddressPools[0] `
    -LoadBalancerInboundNatRule $nrplb.InboundNatRules[1]
