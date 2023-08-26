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

  $sql_insert_time = "INSERT INTO wp_app_time (id_time, id_user, time_start, time_stop, date, trash, status) 
  VALUES (NULL, $id_user, '0', '$time_stop', NOW(), 0, 'stopped')";

  $sql_update_score = "UPDATE wp_app_user SET score = score + $time_score WHERE id_user = $id_user";

  $sql_insert_engaged = "INSERT INTO wp_app_engaged (id_engaged, id_user, type, engaged_date, country, criation_date, trash)
  VALUES (NULL, $id_user, 'timer', NOW(), 'Brasil', NOW(), 0)";

  // Crie um select sql para pegar somente as data de hoje e a somatoria dos atributos time_stop encontrados 



  // SELECT DATE(time_stop) AS data,
  //      SUM(time_stop) AS soma_time_stop
  // FROM registro
  // WHERE DATE(time_stop) = CURDATE();

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
    'timer/v1',
    '/register',
    array(
      'methods' => 'POST',
      'callback' => 'register_timer_callback',
    )
  );
});


function get_timer_realtime_callback()
{
  $limit_timestamp = 7223213; // 02:00:23:213;

  // $sql = "INSERT INTO wp_app_time (id_time, id_user, time_start, time_stop, date, trash, status) 
  // VALUES (NULL, 2, '0', '213123', NOW(), 0, 'stopped')
  // ";
  // $arr = Connection::insert($sql);

  $response = array(
    'message' => 'Endpoint personalizado acessado:',
    'data' => ''
  );
  return new WP_REST_Response($response, 200);
}

add_action('rest_api_init', function () {
  register_rest_route(
    'timer/v1',
    '/time',
    array(
      'methods' => 'GET',
      'callback' => 'get_timer_realtime_callback',
    )
  );
});