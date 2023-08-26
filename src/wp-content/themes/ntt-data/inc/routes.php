<?php

class Connection
{
  private static function getConnection()
  {
    $conn = new mysqli('db', 'root', '', 'wpdatabase');

    if ($conn->connect_error) {
      die('Erro: ' . $conn->connect_error);
    }

    return $conn;
  }

  public static function getResultFromQuery($sql)
  {
    $conn = self::getConnection();
    $result = $conn->query($sql);
    return $result->fetch_assoc();
  }

  public static function all($sql)
  {
    $conn = self::getConnection();
    $result = $conn->query($sql);
    return $result->fetch_all();
  }

  public static function one($sql)
  {
    $conn = self::getConnection();
    $result = $conn->query($sql);
    return $result->fetch_assoc();
  }

  public static function execute($sql)
  {
    $conn = self::getConnection();
    if ($conn->query($sql) === FALSE) {
      return false;
    }

    return true;
  }
}

/**
 * Type: Post
 * Send Data Request: FormData
 * Params: id_user, time_score, time_stop
 */
function register_timer_callback()
{
  $id_user = intval($_POST['id_user']);
  $time_stop = $_POST['time_stop'];
  $time_score = intval($_POST['time_score']);
  $country = $_POST['country'];

  $sql_insert_time = "INSERT INTO wp_app_time (id_time, id_user, time_start, time_stop, date, trash, status) 
  VALUES (NULL, $id_user, '0', '$time_stop', NOW(), 0, 'stopped')";

  $sql_update_score = "UPDATE wp_app_user SET score = score + $time_score WHERE id_user = $id_user";

  $sql_insert_engaged = "INSERT INTO wp_app_engaged (id_engaged, id_user, type, engaged_date, country, criation_date, trash)
  VALUES (NULL, $id_user, 'timer', NOW(), '" . $country . "', NOW(), 0)";

  Connection::execute($sql_insert_time);
  Connection::execute($sql_update_score);
  Connection::execute($sql_insert_engaged);

  $response = array(
    'message' => 'Tempo registrado com sucesso',
    '$_POST' => $_POST
  );

  return new WP_REST_Response($response, 200);
}

add_action('rest_api_init', function () {
  register_rest_route(
    'timer',
    'register',
    array(
      'methods' => 'POST',
      'callback' => 'register_timer_callback',
    )
  );
});

function user_logout_callback()
{
  session_start();
  userLogoutJS();
  session_destroy();
  return new WP_REST_Response('', 200);
}

add_action('rest_api_init', function () {
  register_rest_route(
    'user',
    'logout',
    array(
      'methods' => 'GET',
      'callback' => 'user_logout_callback',
    )
  );
});