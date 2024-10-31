<?php
require 'authentication.php'; // admin authentication check 

// auth check
if(isset($_SESSION['admin_id'])){
  $user_id = $_SESSION['admin_id'];
  $user_name = $_SESSION['admin_name'];
  $security_key = $_SESSION['security_key'];
  if ($user_id != NULL && $security_key != NULL) {
    header('Location: task-info.php');
  }
}

if(isset($_POST['login_btn'])){
 $info = $obj_admin->admin_login_check($_POST);
}

$page_name="Login";
include("include/login_header.php");

?>
<style>
	html, body{
		height:100%;
		width:100%;
		margin:unset !important
	}
	.main{
		display:flex;
		align-items:center;
		justify-content:center;
		height:100%;
		width:100%;
		margin:unset !important
	}
</style>
<div class="col-lg-4 col-md-6 col-sm-12">
	<div class="well rounded-0" style="background:#fff !important">
	<center><h2 style="margin-top:1px;">Employee Task Management System</h2></center>
		<form class="form-horizontal form-custom-login" action="" method="POST">
			<div class="form-heading">
			<h2 class="text-center">Login Panel</h2>
			</div>
			
			<!-- <div class="login-gap"></div> -->
			<?php if(isset($info)){ ?>
			<h5 class="alert alert-danger"><?php echo $info; ?></h5>
			<?php } ?>
			<div class="form-group">
			<input type="text" class="form-control rounded-0" placeholder="Username" name="username" required/>
			</div>
			<div class="form-group" ng-class="{'has-error': loginForm.password.$invalid && loginForm.password.$dirty, 'has-success': loginForm.password.$valid}">
			<input type="password" class="form-control rounded-0" placeholder="Password" name="admin_password" required/>
			</div>
			<button type="submit" name="login_btn" class="btn btn-info pull-right">Login</button>
		</form>
	</div>
</div>


<?php

include("include/footer.php");

?>
