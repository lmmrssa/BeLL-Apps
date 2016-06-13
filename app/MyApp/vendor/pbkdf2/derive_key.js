
function pbk_hash(password, salt, iterations, bytes){
	var obj = new PBKDF2(password, salt, iterations, bytes);
	return obj.deriveKey();
}

function get_password_type(){
    return 'pbkdf21';
}

function hash_login(login, password){
    salt = md5(password)
    return pbk_hash(password,salt,10,20)
}

function generate_credentials(login, password){
    credentials = {
        'type': 'pbkdf21',
        'salt': md5(login), 
        'value': pbk_hash(password, md5(login), 10, 20),
        'login': login
    }
    return credentials
}

function display_message(msg)
{
    if (!document.getElementById("password_status")){
        $('body').append('<div id="password_status"></div>')
    }
    document.getElementById("password_status").innerHTML = msg;
}

function derive_key(password, salt, iterations, bytes)
{
    /*
    var password = document.pbkdf2form.password.value;
    var salt = document.pbkdf2form.salt.value;
    var iterations = document.pbkdf2form.iterations.value;
    var bytes = document.pbkdf2form.bytes.value;
    */

    // Sanity checks
    if (!password || !salt || !iterations || !bytes)
        return display_message("Please fill in all values");

    if (iterations < 0 || iterations > 10000)
        return display_message("Invalid number of iterations. The maximum is limited to 10000 for this demo.");

    if (bytes < 0 || bytes > 100)
        return display_message("Invalid number of bytes. The maximum is limit to 100 for this demo.");

    var mypbkdf2 = new PBKDF2(password, salt, iterations, bytes);
    var status_callback = function(percent_done) {
        display_message("Computed " + Math.floor(percent_done) + "%")};
    var result_callback = function(key) {
        display_message("The derived " + (bytes*8) + "-bit key is: " + key)};
    mypbkdf2.deriveKey(status_callback, result_callback);
}
