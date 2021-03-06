console.log('add game')
// this isn't hooked up to anything but it works

$(document).ready(function() {
	$('.modal-button').click(function(event) {
		event.preventDefault();
		$('.modal').addClass('is-active');
	});

	$('#modal-cancel, #modal-delete').click(function(event) {
		event.preventDefault();
		$('select.select-winner').prop('selectedIndex',0);
		$('select.select-loser').prop('selectedIndex',0);
		$('select option').removeClass('hidden');
		$('.modal').removeClass('is-active');
		$('#add-game').attr('disabled', 'disabled');
	});

	$('select.select-winner').change(function(event) {
		val = $('select.select-winner option:selected').val();
		$('select.select-loser option').removeClass('hidden');
		$('select.select-loser option[value="' + val + '"]').addClass('hidden');

		if($('select.select-winner').val() && $('select.select-loser').val()) {
			$('#add-game').removeAttr('disabled', 'disabled');
		}
	});

	$('select.select-loser').change(function(event) {
		val = $('select.select-loser option:selected').val();
		$('select.select-winner option').removeClass('hidden');
		$('select.select-winner option[value="' + val + '"]').addClass('hidden');

		if($('select.select-winner').val() && $('select.select-loser').val()) {
			$('#add-game').removeAttr('disabled', 'disabled');
		}
	});

	$('#add-game').click(function () {
		$.ajax({
			type: "POST",
			url: '/games/add',
			data: JSON.stringify({
				winner_id: $('select.select-winner option:selected').val(),
				loser_id: $('select.select-loser option:selected').val()
			}),
			success: function (data) {
				console.log(data);
				$('select.select-winner').prop('selectedIndex',0);
				$('select.select-loser').prop('selectedIndex',0);
				$('select option').removeClass('hidden');
				$('.modal').removeClass('is-active');
				$('#add-game').attr('disabled', 'disabled');
			},
			error: function (data) {
				console.log(data);
				$('select.select-winner').prop('selectedIndex',0);
				$('select.select-loser').prop('selectedIndex',0);
				$('select option').removeClass('hidden');
				$('.modal').removeClass('is-active');
				$('#add-game').attr('disabled', 'disabled');
			},
			contentType: 'application/json'
		});
	});
});
