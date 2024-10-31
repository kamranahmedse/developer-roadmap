
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
if ($user_role != 1) {
  header('Location: task-info.php');
}

$admin_id = $_GET['admin_id'];

if(isset($_POST['update_current_employee'])){

    $obj_admin->update_user_data($_POST,$admin_id);
}

if(isset($_POST['btn_user_password'])){

    $obj_admin->update_user_password($_POST,$admin_id);
}



$sql = "SELECT * FROM tbl_admin WHERE user_id='$admin_id' ";
$info = $obj_admin->manage_all_info($sql);
$row = $info->fetch(PDO::FETCH_ASSOC);
        
$page_name="Admin";
include("include/sidebar.php");
?>

    <div class="row">
      <div class="col-md-12">
        <div class="well well-custom">
          <ul class="nav nav-tabs nav-justified nav-tabs-custom">
            <li><a href="manage-admin.php">Manage Admin</a></li>
            <li><a href="admin-manage-user.php">Manage Employee</a></li>
          </ul>
          <div class="gap"></div>

          <div class="row">
            <div class="col-md-10 col-md-offset-1">
              <div class="well">
                <h3 class="text-center bg-primary" style="padding: 7px;">Edit Employee</h3><br>


                      <div class="row">
                        <div class="col-md-7">
                          <form class="form-horizontal" role="form" action="" method="post" autocomplete="off">
                            <div class="form-group">
                              <label class="control-label text-p-reset">Fullname</label>
                              <div class="">
                                <input type="text" value="<?php echo $row['fullname']; ?>" placeholder="Enter Employee Name" name="em_fullname" list="expense" class="form-control rounded-0" id="default" required>
                              </div>
                            </div>
                            
                            <div class="form-group">
                              <label class="control-label text-p-reset">Username</label>
                              <div class="">
                                <input type="text" value="<?php echo $row['username']; ?>" placeholder="Enter Employee Username" name="em_username" class="form-control rounded-0" required>
                              </div>
                            </div>
                            <div class="form-group">
                              <label class="control-label text-p-reset">Email</label>
                              <div class="">
                                <input type="email" value="<?php echo $row['email']; ?>" placeholder="Enter employee email" name="em_email" class="form-control rounded-0" required>
                              </div>
                            </div>
                      
                            <div class="form-group">
                            </div>
                            <div class="form-group">
                              <div class="col-sm-offset-4 col-sm-3">
                                <button type="submit" name="update_current_employee" class="btn btn-primary-custom">Update Now</button>
                              </div>
                            </div>
                          </form> 
                        </div>
                        <div class="col-md-5">
                          <a id="emlpoyee_pass_btn" href="javascript:void(0)" class="">Change Password</a>
                          <form action="" method="POST" id="employee_pass_cng">
                            <div class="form-group">
                              <label for="admin_password">New Password:</label>
                              <input type="password" name="employee_password" class="form-control rounded-0" id="employee_password" min="8" required>
                            </div>
                            <div class="form-group">
                              <button type="submit" name="btn_user_password" class="btn btn-primary rounded-0 btn-sm">Ok</button>

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

<script type="text/javascript">

$('#emlpoyee_pass_btn').click(function(){
    $('#employee_pass_cng').toggle('fast');
});

</script>