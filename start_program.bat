if exist setup_update.bat (
    call setup_update.bat
    del setup_update.bat
)
php artisan serve