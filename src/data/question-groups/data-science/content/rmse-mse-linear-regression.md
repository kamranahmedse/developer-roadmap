**To evaluate a regression model:**

```python
from sklearn.metrics import mean_squared_error  
import numpy as np  
mse = mean_squared_error(y_true, y_pred)  
rmse = np.sqrt(mse)
```

- **MSE:** Penalizes large errors heavily.
- **RMSE:** More interpretable because it's in the same unit as the target.

**Another alternative:**

```python
from sklearn.metrics import mean_absolute_error
mae = mean_absolute_error(y_true, y_pred)
```

**MAE** is less sensitive to outliers. 