certbot renew \
	--cert-name nextfree.com.ua \
	--webroot-path /var/www/nextfree-web/www/public

certbot renew \
	--cert-name api.nextfree.com.ua \
	--webroot-path /var/www/nextfree-web/api/public

certbot renew \
	--cert-name storage.nextfree.com.ua \
	--webroot-path /var/www/nextfree-web/storage/public

certbot renew \
	--cert-name admin.nextfree.com.ua \
	--webroot-path /var/www/nextfree-web/admin/build

certbot renew \
	--cert-name owner.nextfree.com.ua \
	--webroot-path /var/www/nextfree-web/owner/build

certbot renew \
	--cert-name customer.nextfree.com.ua \
	--webroot-path /var/www/nextfree-web/customer/build

certbot renew \
	--cert-name staff.nextfree.com.ua \
	--webroot-path /var/www/nextfree-web/staff/build