 queue()
        .defer(d3.json, "/data")
        .await(makeGraphs);

    function makeGraphs(error, deathData) {

        var ndx = crossfilter(deathData);
//------bar chart        
        var year_dim = ndx.dimension(dc.pluck('Year'));
        var count_by_gender = year_dim.group().reduceSum(dc.pluck('All Deaths'));
        
        dc.barChart("#bchart1")
            .height(300)
            .width(1700)
            .margins({top: 10, right: 50, bottom: 30, left: 50})
            .dimension(year_dim)
            .group(count_by_gender)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Year")
            .yAxis().ticks(8);            
//------pie chart
        
        var state_dim = ndx.dimension(dc.pluck('State'));
        var deaths_per_state = state_dim.group().reduceSum(dc.pluck('All Deaths'));
        dc.pieChart('#pchart1')
            .height(330)
            .radius(90)
            .transitionDuration(1500)
            .dimension(state_dim)
            .group(deaths_per_state);
//------row chart        
        var city_dim = ndx.dimension(dc.pluck('City'));
        var deaths_per_city = city_dim.group().reduceSum(dc.pluck('All Deaths'));
        var chart = dc.rowChart("#rchart1");
        chart
            .width(1400)
            .height(330)
            .dimension(city_dim)
            .group(deaths_per_city)
            .xAxis().ticks(7);
        dc.renderAll();
        };