jQuery.fn.topBar = function () {
	return this.each(function () {
		var element = jQuery(this);

		if (typeof setWithExpiry !== "undefined") {
			var topbar = getWithExpiry('topbar');
			if (topbar == null) {
				jQuery('body').addClass('have-topbar');
				element.show();
			} else {
				jQuery('body').removeClass('have-topbar');
				element.hide();
			}
		}else{
			console.log('Please add the local-data dependency for the code to work fully -> topbar lib')
		}

		element.find('.top-bar-cross').click(function () {
			jQuery(this).parents().find('body').addClass('hide-topbar');
			jQuery(this).parents().find('body').removeClass('have-topbar');
			if (typeof setWithExpiry !== "undefined") {
				setWithExpiry('topbar', 'closed', 0, 86400 * 60 * 24); // 1 Day

			}
		});
		function getWithExpiry(key) {
			const itemStr = localStorage.getItem(key);
			if (!itemStr) {
				return null;
			}
			const item = JSON.parse(itemStr);
			const now = new Date();
			if (now.getTime() > item.expiry) {
				localStorage.removeItem(key);
				return null;
			}
			return item;
		}
		function setWithExpiry(key, value, discount = 0, ttl) {
			const now = new Date();
			const item = {
				value,
				discount,
				expiry: now.getTime() + ttl,
			};
			localStorage.setItem(key, JSON.stringify(item));
		}
	});
};
