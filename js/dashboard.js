// Copyright (c) 2019-2020 The Veles Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php

(function($) {

    var URL =$.getJSON('https://80.211.5.147/api/status');

    function SleepTillUpdateDashboardValues(time) {
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

    try {
        GetDashboardValues();
        GetVersionValues()
        GetDVPNValues();
        GetMasternodeValues();
        GetBlockchainValues();
        SleepTillUpdateDashboardValues(120000).then(() => {
            GetDashboardValues();
            GetVersionValues()
            GetDVPNValues();
            GetMasternodeValues();
            GetBlockchainValues();
      });
    } catch (error) {
        console.log(error);
    }
})(jQuery);