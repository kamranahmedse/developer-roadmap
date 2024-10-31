<?php 
    if(isset($_SERVER['HTTPS'])){
        $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
    }
    else{
        $protocol = 'http';
    }
$base_url = $protocol . "://".$_SERVER['SERVER_NAME'].'/' .(explode('/',$_SERVER['PHP_SELF'])[1]).'/';
?>
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


if(isset($_GET['delete_task'])){
  $action_id = $_GET['task_id'];
  
  $sql = "DELETE FROM task_info WHERE task_id = :id";
  $sent_po = "task-info.php";
  $obj_admin->delete_data_by_this_method($sql,$action_id,$sent_po);
}

if(isset($_POST['add_task_post'])){
    $obj_admin->add_new_task($_POST);
}

$page_name="Task_Info";
include("include/sidebar.php");
// include('ems_header.php');


?>
<?php $date = isset($_GET['date']) ? $_GET['date'] : date('Y-m-d') ?>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

    <div class="row">
      <div class="col-md-12">
        <div class="well well-custom rounded-0">
          <div class="gap"></div>
          <div class="row">
            <div class="col-md-4">
                <input type="date" id="date" value="<?= $date ?>" class="form-control rounded-0">
            </div>
            <div class="col-md-4">
                  <button class="btn btn-primary btn-sm btn-menu" type="button" id="filter"><i class="glyphicon glyphicon-filter"></i> Filter</button>
                  <button class="btn btn-success btn-sm btn-menu" type="button" id="print"><i class="glyphicon glyphicon-print"></i> Print</button>
            </div>

            
          </div>
          <center ><h3>Daily Task Report</h3></center>
          <div class="gap"></div>

          <div class="gap"></div>

          <div class="table-responsive" id="printout">
            <table class="table table-codensed table-custom">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task Title</th>
                  <th>Assigned To</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>

              <?php 
                if($user_role == 1){
                  $sql = "SELECT a.*, b.fullname 
                        FROM task_info a
                        INNER JOIN tbl_admin b ON(a.t_user_id = b.user_id) where ('{$date}' BETWEEN date(a.t_start_time) and date(a.t_end_time))
                        ORDER BY a.task_id DESC";
                }else{
                  $sql = "SELECT a.*, b.fullname 
                  FROM task_info a
                  INNER JOIN tbl_admin b ON(a.t_user_id = b.user_id)
                  WHERE a.t_user_id = $user_id and ('{$date}' BETWEEN date(a.t_start_time) and date(a.t_end_time))
                  ORDER BY a.task_id DESC";
                } 
                
                  $info = $obj_admin->manage_all_info($sql);
                  $serial  = 1;
                  $num_row = $info->rowCount();
                  if($num_row==0){
                    echo '<tr><td colspan="7">No Data found</td></tr>';
                  }
                      while( $row = $info->fetch(PDO::FETCH_ASSOC) ){
              ?>
                <tr>
                  <td><?php echo $serial; $serial++; ?></td>
                  <td><?php echo $row['t_title']; ?></td>
                  <td><?php echo $row['fullname']; ?></td>
                  <td><?php echo $row['t_start_time']; ?></td>
                  <td><?php echo $row['t_end_time']; ?></td>
                  <td>
                    <?php  if($row['status'] == 1){
                        // echo "In Progress <span style='color:#5bcad9;' class=' glyphicon glyphicon-refresh' >";
                        echo '<small class="label label-warning px-3">In Progress <span class="glyphicon glyphicon-refresh" ></small>';
                    }elseif($row['status'] == 2){
                        echo '<small class="label label-success px-3">In Completed <span class="glyphicon glyphicon-ok" ></small>';
                        // echo "Completed <span style='color:#00af16;' class=' glyphicon glyphicon-ok' >";
                    }else{
                        echo '<small class="label label-default border px-3">In Completed <span class="glyphicon glyphicon-remove" ></small>';
                    } ?>
                    
                  </td>
                </tr>
                <?php } ?>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


<?php

include("include/footer.php");



?>
<noscript>
    <div>
        <style>
            body{
                background-image:none !important;
            }
            .mb-0{
                margin:0px;
            }
        </style>
        <div style="line-height:1em">
        <h4 class="mb-0 text-center"><b>Employee Task Managament System</b></h4>
        <h4 class="mb-0 text-center"><b>Daily Task Report</b></h4>
        <div class="mb-0 text-center"><b>as of</b></div>
        <div class="mb-0 text-center"><b><?= date("F d, Y", strtotime($date)) ?></b></div>
        </div>
        <hr>
    </div>
</noscript>

<script type="text/javascript">
$(function(){
    $('#filter').click(function(){
        location.href="./daily-task-report.php?date="+$('#date').val()
    })
    $('#print').click(function(){
        var h = $('head').clone()
        var ns = $($('noscript').html()).clone()
        var p = $('#printout').clone()
        var base = '<?= $base_url ?>';
        h.find('link').each(function(){
            $(this).attr('href', base + $(this).attr('href'))
        })
        h.find('script').each(function(){
            if($(this).attr('src') != "")
            $(this).attr('src', base + $(this).attr('src'))
        })
        p.find('.table').addClass('table-bordered')
        var nw = window.open("", "_blank","width:"+($(window).width() * .8)+",left:"+($(window).width() * .1)+",height:"+($(window).height() * .8)+",top:"+($(window).height() * .1))
            nw.document.querySelector('head').innerHTML = h.html()
            nw.document.querySelector('body').innerHTML = ns[0].outerHTML
            nw.document.querySelector('body').innerHTML += p[0].outerHTML
            nw.document.close()
            setTimeout(() => {
                nw.print()
                setTimeout(() => {
                    nw.close()
                }, 200);
            }, 200);

    })
})
</script>
