
<?php

require 'authentication.php'; // admin authentication check 

// auth check
$user_id = $_SESSION['admin_id'];
$user_name = $_SESSION['name'];
$security_key = $_SESSION['security_key'];
if ($user_id == NULL || $security_key == NULL) {
    header('Location: index.php');
}

// check admin 
$user_role = $_SESSION['user_role'];


$admin_id = $_GET['admin_id'];
if(isset($_POST['btn_admin_password'])){
    $error = $obj_admin->admin_password_change($_POST,$admin_id);
}

             
$page_name="Admin";
include("include/sidebar.php");


?>

<script>
  function validate(admin_new_password,admin_cnew_password){
      var a = document.getElementById(admin_new_password).value;
      var b = document.getElementById(admin_cnew_password).value;
      if (a!=b) {
          alert("Passwords do not match");
          
      }
      return false;
  }
</script>


    <div class="row">
      <div class="col-md-12">
        <div class="well well-custom">
          <ul class="nav nav-tabs nav-justified nav-tabs-custom">
            <li class="active"><a href="manage-admin.php">Manage Admin</a></li>
            <li><a href="admin-manage-user.php">Manage User</a></li>
          </ul>
          <div class="gap"></div>
          <div class="row">
            <div class="col-md-10 col-md-offset-1">
              <div class="well" style="background:#fff !important">
                <h3 class="text-center bg-primary" style="padding: .5em!important">Admin - Change Password</h3><br>


                      <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                        
                        <?php 

                        if(isset($error)){
                          ?>
                          <div class="alert alert-danger">
                            <strong>Oopps!!</strong> <?php echo $error; ?>
                          </div>
                          <?php
                          
                        }
                        ?>
                          

                          <form class="form-horizontal" role="form" action="" method="post" autocomplete="off">
                            <div class="form-group">
                              <label class="control-label text-p-reset">Old Password</label>
                              <div class="">
                                <input type="password" placeholder="Enter Old Password" name="admin_old_password" id="admin_old_password" list="expense" class="form-control rounded-0" required>
                              </div>
                            </div>
                            <div class="form-group">
                              <label class="control-label text-p-reset">New Password</label>
                              <div class="">
                                <input type="password" placeholder="Enter New Password" name="admin_new_password" id="admin_new_password" class="form-control rounded-0" min="8" required>
                              </div>
                            </div>
                            <div class="form-group">
                              <label class="control-label text-p-reset">Confirm New Password</label>
                              <div class="">
                                <input type="password" placeholder="Confirm New Password" name="admin_cnew_password" id="admin_cnew_password" list="expense" min="8" class="form-control rounded-0" required>
                              </div>
                            </div>
                      
                            <div class="form-group">
                            </div>
                            <div class="form-group">
                              <div class="col-sm-offset-4 col-sm-3">
                                <button type="submit" name="btn_admin_password" class="btn btn-primary-custom">Change</button>
                                
                              </div>
                              <div class="col-sm-3">
                                <a href="manage-admin.php" class="btn btn-default">Cancel</a>
                              </div>
                            </div>
                          </form> 
                        </div>
                      </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


<?php

include("include/footer.php");

?>

