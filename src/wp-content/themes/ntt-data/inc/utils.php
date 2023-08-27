<?php

function userLoginJS($user)
{
  $html = <<<HTML
    <script>
      const user = {
        id_user: "$user->id_user",
        full_name: "$user->full_name",
        email: "$user->email",
        country: "$user->country",
        username: "$user->username",
        password: "$user->password",
        photo: "$user->photo",
        score: "$user->score",
        time: "$user->time",
        date_start: "$user->date_start",
        trash: "$user->trash",
        office: "$user->office",
        off_company: "$user->off_company",
        guest: "$user->guest"
      }

      const userStorage = new UserStorage;
      userStorage.setStorage(user);
      console.log('userStorage:', userStorage.getStorage());
    </script>
  HTML;

  echo $html;
}

function userLogoutJS()
{
  echo "<script src='" . get_stylesheet_directory_uri() . "/app/public/assets/js/global.js'></script>";
  echo "<script src='" . get_stylesheet_directory_uri() . "/app/public/assets/js/components/userStorage.js'></script>";

  $html = <<<HTML
    <script>
      const userStorage = new UserStorage;
      userStorage.removeStorage();
    </script>
  HTML;

  echo $html;
}