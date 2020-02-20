$(function() {

	// Fixed menu on scroll
	const fixedHeight = 500
	const $headerCap = $('.header-cap')
	const blankReplacer = $('<div>')
	blankReplacer.height($headerCap.height() + 20)

	$(document).on('scroll', function () {
		const offsetTop = window.scrollY
		if(offsetTop > fixedHeight) {
			$headerCap.addClass('fixed')
			$headerCap.after(blankReplacer)
		}
		else {
			$headerCap.removeClass('fixed')
			blankReplacer.remove()
		}
	})

	// Anchors
	$('a.anchor').on('click', function(e) {
		e.preventDefault()
		const link = $(this).attr('href')
		const targetHeight = $(link).offset().top - ($headerCap.height() + 30)
		$('html, body').animate({
			scrollTop: targetHeight
		}, 800)
	})


	// Search click
	$('.header-search').on('click', e => {
		console.log(e.target)
		if (e.target.id !== "searchAll" && e.target.id !== "closeMobileSearch")
			$(this).find('.header-search-field').focus()
	})

	// Open search

	const searchToggler = $('#searchToggler')
	const searchField = $('.header-search')
	searchToggler.on('click', function() {
		searchField.addClass('visible')
	})

	// Close search
	$('#closeMobileSearch').on('click', function() {
		searchField.removeClass('visible')
	})

	//Open menu
	const advMenuToggler = $('.header-menu-advancedToggler')
	const advMenu = $('.header-menu-advanced')
	const advMenuCloser = $('#closeAdvanced')

	async function fadeElements() {
		for(let i = 0; i < advMenu.find('ul').children().length; i++) {
			const elem = advMenu.find('ul').children().eq(i)
			$(elem).css({
				position: 'relative',
				bottom: -40,
			})
			elem.animate({
				bottom: 0,
				opacity: 1
			}, 400)
			await new Promise(r => setTimeout(r, 200));
		}
	}

	advMenuToggler.on('click', function() {
		advMenu.fadeIn()
		advMenu.find('ul').children().css('opacity', 0)
		fadeElements()
	})
	advMenuCloser.on('click', function() {
		advMenu.fadeOut()
	})

	$('#interviewSlider').slick({
		dots: true,
		infinite: true,
		prevArrow: '<img src="img/icons/arrow-down.svg" class="slick-prev">',
		nextArrow: '<img src="img/icons/arrow-down.svg" class="slick-next">'
	})

	$('#topPosts').slick({
		dots: true,
		infinite: true,
		prevArrow: '<img src="img/icons/arrow-down.svg" class="slick-prev">',
		nextArrow: '<img src="img/icons/arrow-down.svg" class="slick-next">'
	})

	/*const $steps = $('.register-steps')
	const currentStep = $steps.attr('data-step')

	for(let i = 0; i < currentStep; i++) {
		$steps.children().eq(i).addClass('active-step')
	}*/

	// Modals 

	$('.btn[data-modal-caller]').on('click', function() {
		let modalId = this.dataset.modalCaller
		$('.modals').show()
		$(`.modals-window[data-modal=${modalId}]`).show()
		$('body').addClass('openedModal')
	})
	$('.modals-window .closer').on('click', () => {
		$('.modals').hide()
		$('.modals-window').hide()
		$('body').removeClass('openedModal')
	})

	$('.getContacts').on('click', function(e) {
		// e.preventDefault()
		$(this).addClass('contacted').html('<a href="tel:799999999">+7 (999) 999 99 99</a>')
	})

	// Multiple Fields

	$('.multiple .btnAdd').on('click', function(e) {
		e.preventDefault()
		const multipleName = $(this).prev('input')
		const $box = $(this).parent().parent().find('.multiple-box')
		if(multipleName.val().length > 0) {
			const multipleHTML = `<li><span class="multiple-box-name">${multipleName.val()}</span><img src="img/icons/close.svg" alt="" class="closer"></li>`
			if($box.html().trim().indexOf(multipleHTML) == -1) {
				$box.append(multipleHTML)
				multipleName.val('')
			}
		}
	})
	$('.multiple-box').on('click', 'li .closer', function() {
		$(this).parent().remove()
	})

})