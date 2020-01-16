/*
 * Main masternode dashboard functionality
 *
 * Copyright (C) 2020 The Veles Core developers
 * Author: mdfkbtc
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 */
(function($) {

    // Either connect to API of current host where dashboard is running,
    // or fetch random MN information when developing on localhost
    if (document.location.host == 'localhost') {
        var URL = $.getJSON('https://explorer.veles.network/dapi/status');
    } else {
        var URL = $.getJSON(
            document.location.protocol + '://' + document.location.host + '/api/status'
            );
    }

    function SleepTillUpdateValues(time) {
        return new Promise((resolve) => setInterval(resolve, time));
    }

    function GetDashboardValues() {
        URL.then(function(json) {
            for (var dashboard_key in json.result) {
                if (Object.prototype.hasOwnProperty.call(json.result, dashboard_key)) {
                    var dashboard = json.result[dashboard_key];
                    var dashboard_vpn = json.result['services'];
                    var dashboard_vpn_key = dashboard_vpn['VPN'];
                    $("#clients-connected").text(dashboard_vpn_key.client_count);
                    $("#masternode-status").text(dashboard.state_name);
                    $("#latest-block").text(dashboard.blocks);
                    $("#dvpn-status").text(dashboard_vpn_key.state_name);
                      
                }
            }

        });
    }
    function GetVersionValues() {
        URL.then(function(json) {
            var version_key = 'version';
            for (var version_key in json.result) {
                if (Object.prototype.hasOwnProperty.call(json.result, version_key)) {
                    var version = json.result[version_key];
                    $("#version-masternode").text(version.mn_version);
                    $("#version-wallet").text(version.core_version);
                    $("#version-protocol").text(version.protocol_version);
                    $("#version-api").text(version.api_version);
                      
                }
            }

      });
    }
    function GetDVPNValues() {
        URL.then(function(json) {
            for (var dvpn_key in json.result) {
                if (Object.prototype.hasOwnProperty.call(json.result, dvpn_key)) {
                    var dvpn = json.result[dvpn_key];
                    var dvpn_atr = json.result['services'];
                    var dvpn_atr_key = dvpn_atr['VPN'];
                    var traffic_key = dvpn_atr_key['metrics'];
                    var traffic_daily = traffic_key['daily'];
                    var traffic_hourly = traffic_key['hourly'];
                    $("#clients-connected").text(dvpn_atr_key.client_count);
                    $("#dvpn-status-tab").text(dvpn_atr_key.state_name);
                    $("#dvpn-server-state").text(dvpn_atr_key.server_state);
                    $("#dvpn-server-version").text(dvpn_atr_key.server_version);
                    $("#dvpn-up-since").text(dvpn_atr_key.up_since);
                    $("#dvpn-traffic-sent-daily").text(traffic_daily.bytes_out);
                    $("#dvpn-traffic-received-daily").text(traffic_daily.bytes_in);
                    $("#dvpn-traffic-sent-hourly").text(traffic_hourly.bytes_out);
                    $("#dvpn-traffic-received-hourly").text(traffic_hourly.bytes_in);

                }
            }

        });
    }
    function GetBlockchainValues() {
        URL.then(function(json) {
            var tr;
            for (var blockchain_key in json.result) {
                if (Object.prototype.hasOwnProperty.call(json.result, blockchain_key)) {
                    var blockchain = json.result[blockchain_key];
                    $("#blockchain-connections").text(blockchain.connections);
                    $("#blockchain-latest-block").text(blockchain.blocks);
                    $("#blockchain-mininmum-fee").text(blockchain.relayfee);
                    $("#blockchain-nex-halving").text(blockchain.blocks_to_next_epoch);
                    $("#blockchain-halving-reached").text(blockchain.epoch_supply_target_reached);
                    $("#blockchain-halving-happend").text(blockchain.halvings_occured);
                    $("#blockchain-best-blockhash").text(blockchain.bestblockhash);
                      
                }
            }
           
      });
    }
    function GetMasternodeValues() {
        URL.then(function(json) {
            for (var masternode_key in json.result) {
                if (Object.prototype.hasOwnProperty.call(json.result, masternode_key)) {
                    var masternode = json.result[masternode_key];
                    $("#masternode-version").text(masternode.mn_version);
                    $("#masternode-payee").text(masternode.payee);
                    $("#masternode-status-tab").text(masternode.state_name);
                    $("#masternode-ip").text(masternode.service);
                    $("#masternode-signing-key").text(masternode.signing_key);
                    $("#masternode-launch-output").text(masternode.status);
                      
                }
            }

      });
    }
    function ClientsCountChart() {
        URL.then(function(json) {
            for (var dashboard_key in json.result) {
                if (Object.prototype.hasOwnProperty.call(json.result, dashboard_key)) {
                    var dashboard = json.result[dashboard_key];
                    var dashboard_vpn = json.result['services'];
                    var dashboard_vpn_key = dashboard_vpn['VPN'];

                    var ctx = document.getElementById("percent-chart");
                    if (ctx) {
                        ctx.height = 150;
                        var myChart = new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                datasets: [{
                                    label: "Clients count",
                                    data: [dashboard_vpn_key.client_count, 10],
                                    backgroundColor: [
                                        'rgba(250, 66, 81, 0.5)',
                                        'rgba(187, 255, 170, 0.5)'
                                    ],
                                    hoverBackgroundColor: [
                                        'rgba(250, 66, 81, 0.7)',
                                        'rgba(187, 255, 170, 0.7)'
                                    ],
                                    borderWidth: [
                                        2, 2
                                    ],
                                    borderColor: [
                                        '#262626',
                                        '#262626'
                                    ],
                                    hoverBorderColor: [
                                        'transparent',
                                        'transparent'
                                    ]
                                }],
                                labels: [
                                    'Clients Connected',
                                    'Max Clients'
                                ]
                            },
                            options: {
                                maintainAspectRatio: false,
                                responsive: true,
                                cutoutPercentage: 80,
                                animation: {
                                    animateScale: true,
                                    animateRotate: true
                                },
                                legend: {
                                    display: false
                                },
                                tooltips: {
                                    xPadding: 5,
                                    yPadding: 5,
                                    caretPadding: 10,
                                    bodyFontSize: 16
                                }
                            }
                        });

                    }
                    $("#clients-connected-chart").text(dashboard_vpn_key.client_count);
                }
            }

        });
    }
    function GetMnList() {
        URL.then(function(json) {
            var tr;
            for (var mn_key in json.result) {
                if (Object.prototype.hasOwnProperty.call(json.result, mn_key)) {
                    var mn = json.result[mn_key];
                    var mn_href = '<tr class="mn-row" data-href="https://' + mn.ip + '/api/status" data-target="_blank">';
                    //if(mn.mn_version) {
                    $('#mn_list').append(mn_href +
                        '<td>' + mn.ip + '</td>' +
                        '<td>' + (mn.services_available ? mn.services_available : '-') + '</td>' +
                        '<td>' + mn.status + '</td>' +
                        '<td>' + (mn.mn_version ? mn.mn_version : '100000') + '</td>' +
                        '<td>' + (mn.api_latency ? mn.api_latency : '-') + '</td>' +
                        '<td class="no-overflow">' + mn.payee + '</td>' +
                        '</tr>');
                }
            }
            if (!$('#mn_list').hasClass('with-datatable')) {
                $('#mn_list').DataTable({
                    "paging": true,
                    "searching": true,
                    "pageLenght": 10,
                });
                $('#mn_list').addClass('with-datatable');
                $('.mn-row').each(function(){
                  var $th = $(this);
                  $th.on('click', function(){
                      window.open($th.attr('data-href'), $th.attr('data-target'));
                  });
                });
            }
        });

    }
    function UpdateValues() {
        GetDashboardValues();
        GetVersionValues();
        GetDVPNValues();
        GetMasternodeValues();
        GetBlockchainValues();
        ClientsCountChart();
        GetMnList();
    }

    try {
        UpdateValues();
        SleepTillUpdateValues(120000).then(() => {
            UpdateValues();
      });
    } catch (error) {
        console.log(error);
    }

    masternodeDashboardApp.addGoHook('#dashboard', function() {
        GetDashboardValues();
        GetVersionValues();
        ClientsCountChart();
    });
    masternodeDashboardApp.addGoHook('#services', function() {
        GetDVPNValues();
        GetMasternodeValues();
        GetBlockchainValues();
        GetVersionValues();
    });
    masternodeDashboardApp.addGoHook('#masternode-list', function() {
        GetMnList();
    });


})(jQuery);