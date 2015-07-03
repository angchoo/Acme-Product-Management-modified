/**
 * Created by jfangchoo on 24/06/2015.
 */
(function(){
    "use strict";
    angular
        .module("productManagement")
        .controller("PriceAnalyticsCtrl",PriceAnalyticsCtrl);

    PriceAnalyticsCtrl.$inject=["$scope",
        "$filter",
        "product",
        "productService"
    ]


    function PriceAnalyticsCtrl($scope,$filter, product, productService){
        $scope.title="Price Analytics";

        for(var i=0;i<product.length;i++){

            product[i].marginPercent=productService.calculateMarginPercent(product[i].price,product[i].cost);

            product[i].marginAmount=productService.calculateMarginAmount(product[i].price,product[i].cost);
        }

        var orderedProductsAmount=$filter("orderBy")(product,"marginAmount");
        var filteredProductsAmount=$filter("limitTo")(orderedProductsAmount,5);

        var chartDataAmount=[];
        for(var i=0;i<filteredProductsAmount.length;i++){
            chartDataAmount.push({
                x:filteredProductsAmount[i].productName,
                y:[ filteredProductsAmount[i].cost,
                    filteredProductsAmount[i].price,
                    filteredProductsAmount[i].marginAmount]
            });
        }

        $scope.dataAmount={
            series:["Cost","Price","Margin Amount"],
            data:chartDataAmount
        };

        $scope.configAmount = {
            title: "Top $ Margin Products",
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                position: "right"
            }
        };

        var orderedProductsPercent=$filter("orderBy")(product,"marginPercent");
        var filteredProductsPercent=$filter("limitTo")(orderedProductsPercent,5);


        var chartDataPercent=[];
        for(var i=0;i<filteredProductsPercent.length;i++){
            chartDataPercent.push({
                x:filteredProductsPercent[i].productName,
                y:[filteredProductsPercent[i].marginPercent]
            });
        }

        $scope.dataPercent={
            series:["Margin Percent"],
            data:chartDataPercent
        };

        $scope.configPercent = {
            title: "Top % Margin Products",
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                position: "right"
            }
        };

        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.labels2 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data2 = [300, 500, 100];

        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'column',
                margin: 75,
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            title: {
                text: '3D chart'
            },
            subtitle: {
                text: 'Test options by dragging the sliders below'
            },
            plotOptions: {
                column: {
                    depth: 25
                }
            },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }]
        });

        function showValues() {
            $('#R0-value').html(chart.options.chart.options3d.alpha);
            $('#R1-value').html(chart.options.chart.options3d.beta);
        }

        // Activate the sliders
        $('#R0').on('change', function () {
            chart.options.chart.options3d.alpha = this.value;
            showValues();
            chart.redraw(false);
        });
        $('#R1').on('change', function () {
            chart.options.chart.options3d.beta = this.value;
            showValues();
            chart.redraw(false);
        });

        showValues();


    }
})()