// Copyright (c) 2019-2020 The Veles Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php

(function($) {

    function SleepTillUpdateMnList(time) {
        return new Promise((resolve) => setInterval(resolve, time));
    }

    function GetMnList() {
        $.getJSON('https://explorer.veles.network/dapi/mn/list/assoc').then(function(json) {
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
    try {
        GetMnList();
        SleepTillUpdateMnList(120000).then(() => {
            GetMnList();
        });
    } catch (error) {
        console.log(error);
    }

})(jQuery);

