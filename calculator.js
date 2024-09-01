( function( $ ) {
	$(document).ready(function(){
		$(".appliance-item").click(function(){
		 var watt=$(this).data('wattage');
		 var title=$(this).data('title');
		 var hour=$(this).data('hour');
		 var kwh=(watt*hour)/1000;
		 
		 var row='<tr><td class="appliance-title">'+title+'</td><td><input type="number" class="quantity" name="quantity[]" value="1" ></td><td><input type="number" class="wattage" name="wattage[]" value="'+watt+'"></td><td><input type="number" class="hours-per-day" name="hours-per-day[]" value="'+hour+'"></td><td><span class="daily-kwh">'+kwh+'</span></td><td><button class="remove-btn"><i class="fa fa-trash" aria-hidden="true"></i></button></td></tr>';
		 $('table #appliance-list').append(row);
		 calculateTotals();
		});

		$('#appliance-list').on('click', '.remove-btn', function () {
		  $(this).parent().parent().remove();
		  calculateTotals();
		});

		$('#appliance-list').on('change', 'input', function () {
		  
		  calculateTotals();
		});

		$('#summary-table').on('change', 'input', function () {
		  
		  calculateTotals();
		});
	  });

function calculateTotals(){

	var i=0;
	var totalWatt=0;
	var totalKWh=0;
	$( ".quantity" ).each(function(index) {
		var quantity=$(this).val();
		var wattage=$('.wattage').eq(index).val();
		var hour=$('.hours-per-day').eq(index).val();
		var kwh=(quantity*wattage*hour)/1000;
		$('.daily-kwh').eq(index).html(kwh);
		totalWatt=parseFloat(totalWatt)+parseFloat(wattage)*quantity;
		totalKWh=totalKWh+kwh;
	});
	var kw=totalWatt/1000;
	$('#total-load-kw').html(kw);
	$('#total-kwh-per-day').html(totalKWh);

	var inverterKW=(kw*parseFloat($('#simultaneous-usage').val()))/100;
	var solarKW=kw/parseFloat($('#sun-hours').val());
	var batteryKW=kw*parseFloat($('#reserve-days').val());
	var inverterText="0kVA Inverter";
	if(inverterKW<0 || inverterKW==0){
		inverterText="0kVA Inverter";
	}else if(inverterKW<3){
		inverterText="3kVA Inverter"
	}else if(inverterKW<5){
		inverterText="5kVA Inverter";
	}else if(inverterKW<8){
		inverterText="8kVA Inverter";
	}else if(inverterKW<12){
		inverterText="15kVA Inverter";
	}else if(inverterKW<16){
		inverterText="2x10kVA Inverter";

	}else if(inverterKW<23){
		inverterText="2x15kVA Inverter";
	}else{
		inverterText="0kVA Inverter";
	}
	$('#inverter-size').html(inverterText);

	var solarText="";
	if(solarKW>0 && solarKW<2){
		solarText="6 x 275W";
	}else if(solarKW<3){
		solarText="9 x 275W";
	}else if(solarKW<5){
		solarText="10 x 390W"
	}else if(solarKW<6){
		solarText="15 x 370W"
	}else if(solarKW<8){
		solarText="18 x 390W"
	}else if(solarKW<10){
		solarText="25 x 390W"
	}else if(solarKW<14){
		solarText="35 x 390W"
	}else if(solarKW<19){
		solarText="50 x 370W"
	}else if(solarKW>18){
		solarText="50+ "
	}else{
		solarText=""
	}
	$('#solar-panel-size').html(solarText);

	var batteryText="";
	if(batteryKW>50){
		batteryText="50+ kWh";
	}else if(batteryKW>40){
		batteryText="40 - 50kWh";
	}else if(batteryKW>30){
		batteryText="30 - 40kWh";
	}else if(batteryKW>25){
		batteryText="25 - 30kWh";
	}else if(batteryKW>20){
		batteryText="20 - 25kWh";
	}else if(batteryKW>15){
		batteryText="15 - 20kWh";
	}else if(batteryKW>10){
		batteryText="10 - 15kWh";
	}else if(batteryKW>7.5){
		batteryText="7.5 - 10kWh";
	}else if(batteryKW>5){
		batteryText="5 - 7.5kWh";
	}else if(batteryKW>2.5){
		batteryText="2.5 - 5kWh";
	}else if(batteryKW>0){
		batteryText="0 - 2.5kWh";
	}else{
		batteryText="0kWh";
	}
	$('#battery-capacity').html(batteryText);

	$('.appliance-item').removeClass('active');
	$('.appliance-title').each(function(){
		var title=$(this).html();
		$('.appliance-item[data-title="'+title+'"]').addClass('active');
	});

	if(totalWatt==0){
		$('#pdf-btn').addClass('d-none');
	}else{
		$('#pdf-btn').removeClass('d-none');
	}
}

} )( jQuery );

let lastScrollTop = 0;
let isScrolling;

document.addEventListener('scroll', function() {
    const section1 = document.getElementById('section1');
    const scrollPosition = window.scrollY;

    if (window.innerWidth >= 900) {
        clearTimeout(isScrolling);

        let offset = 0;

        if (scrollPosition > lastScrollTop) {
            offset = -20; // 아래로 10px 이동
        } else {
            offset = 20; // 위로 10px 이동
        }

        section1.style.transform = `translateY(${offset}px)`;

        isScrolling = setTimeout(() => {
            section1.style.transform = 'translateY(0)';
        }, 20);
    } else {
        section1.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollPosition;
});