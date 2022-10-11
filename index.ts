import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';
TreeGrid.Inject(Page);
let treegrid: TreeGrid = new TreeGrid({
  checkboxChange(args) {
    debugger;
    if (args.checked) {
      setTimeout(() => {
        const checkedRows = this.element.querySelectorAll('.e-check');
        Array.from(checkedRows).map((row) => {
          row.closest('tr').classList.add('bgcolor');
        });
      }, 0);
    } else {
      setTimeout(() => {
        const coloredRows = this.element.querySelectorAll('.bgcolor');
       
 Array.from(coloredRows).map((row) => {
          if (row.querySelector('.e-uncheck') || row.querySelector('.e-stop')) {
           
 row.classList.remove('bgcolor');
          }
        });
      }, 0);
    }
  },
  dataSource: sampleData,
  childMapping: 'subtasks',
  height: 350,
  treeColumnIndex: 1,
  enableCollapseAll: true,
  autoCheckHierarchy: true,
  allowSelection: true,
  selectionSettings: { persistSelection: true },
  columns: [
    {
      field: 'taskID',
      headerText: 'Task ID',
      isPrimaryKey: true,
      width: 70,
      textAlign: 'Right',
    },
    {
      field: 'taskName',
      headerText: 'Task Name',
      showCheckbox: true,
      width: 180,
      textAlign: 'Left',
    },
    { field: 'priority', headerText: 'Priority', width: 90 },
  ],
  });
treegrid.appendTo('#TreeGrid');
