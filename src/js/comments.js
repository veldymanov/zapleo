$(document).ready(function () {
//Stretching the connection lines between comments
	function setConnectorsHeight() {
		var $connector = $(this),
			$prevCommentHeight = $connector.closest('.children').prev().height();
		$connector.height($prevCommentHeight + 64);
	}
	
	if ($(window).width() >= 768) {
		$('.connector').each(setConnectorsHeight);
	}
	
	$(window).resize(function () {
		if ($(window).width() >= 768) {
			$('.connector').each(setConnectorsHeight);
		}
	});
});
