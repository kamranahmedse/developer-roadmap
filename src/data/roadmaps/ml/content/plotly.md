# plotly

Plotly is a web-based data visualization library for creating interactive charts and graphs. It offers a wide range of graph types, including scatter plots, line charts, bar charts, and heatmaps, among others. Plotly allows you to create interactive visualizations that can be easily customized and shared

plotly.py is a high-level, declarative charting library. plotly.js ships with over 30 chart types, including scientific charts, 3D graphs, statistical charts, SVG maps, financial charts, and more.


# Installation

Plotly does not come built-in with Python. To install it type the below command in the terminal.

command line : **pip install plotly**

# Package Structure of Plotly

There are three main modules in Plotly. They are:

plotly.plotly
plotly.graph.objects
plotly.tools
**plotly.plotly** acts as the interface between the local machine and Plotly. It contains functions that require a response from Plotly’s server.

**plotly.graph_objects** module contains the objects (Figure, layout, data, and the definition of the plots like scatter plot, line chart) that are responsible for creating the plots.  The Figure can be represented either as dict or instances of **plotly.graph_objects.Figure** and these are serialized as JSON before it gets passed to plotly.js. Consider the below example for better understanding.

**Note:** plotly.express module can create the entire Figure at once. It uses the graph_objects internally and returns the graph_objects.Figure instance.

_Example:_

'''import plotly.express as px
### Creating the Figure instance
fig = px.line(x=[1,2, 3], y=[1, 2, 3])

### printing the figure instance
print(fig)'''

# **Plotly Tutorial for Beginners**
[Plotly for Beginner level](https://www.kaggle.com/code/kanncaa1/plotly-tutorial-for-beginners)
## Some plotes in plotly 
    1.Line Charts
    2.Scatter Charts
    3.Bar Charts
    4.Pie Charts
    5.Bubble Charts

# _Line plot_

Line plot in Plotly is much accessible and illustrious annexation to plotly which manage a variety of types of data and assemble easy-to-style statistic. With px.line each data position is represented as a vertex  (which location is given by the x and y columns) of a polyline mark in 2D space.

_Example:_
'''import plotly.express as px

_#using the iris dataset._

df = px.data.iris()

_#plotting the line chart._

fig = px.line(df, x="species", y="petal_width")

_#showing the plot._

fig.show()''

 [Video Material](https://youtu.be/c6gVnZ0cmqM)

# Scatter Charts

A **scatter plot** is a set of dotted points to represent individual pieces of data in the horizontal and vertical axis. A graph in which the values of two variables are plotted along X-axis and Y-axis, the pattern of the resulting points reveals a correlation between them.

[Video Material](https://youtu.be/8UX0BE405Vg)

_Example:_
 '''import plotly.express as px

_#using the iris dataset._

df = px.data.iris()

_#plotting the scatter chart._

fig = px.scatter(df, x="species", y="petal_width")

_#showing the plot._

fig.show()'''

# Bar chart 

A **bar chart** is a pictorial representation of data that presents categorical data with rectangular bars with heights or lengths proportional to the values that they represent. In other words, it is the pictorial representation of dataset. These data sets contain the numerical values of variables that represent the length or height.

[Video Material](https://youtu.be/oz7sg5NW4WU)

_Example:_
'''import plotly.express as px

_#using the iris dataset._

df = px.data.iris()
_#plotting the bar chart_

fig = px.bar(df, x="sepal_width", y="sepal_length")

_#showing the plot._

fig.show()'''

# Pie chart

A **pie chart** is a circular statistical graphic, which is divided into slices to illustrate numerical proportions. It depicts a special chart that uses “pie slices”, where each sector shows the relative sizes of data. A circular chart cuts in a form of radii into segments describing relative frequencies or magnitude also known as circle graph.

[Video Material](https://youtu.be/7o6Aqp6kjTg)

_Example:_
'''import plotly.express as px

_#using the tips dataset_

df = px.data.tips()

_#plotting the pie chart_

fig = px.pie(df, values="total_bill", names="day")

_#showing the plot_

fig.show()'''

# Bubble chart

A **bubble plot** is a scatter plot with bubbles (color-filled circles). Bubbles have various sizes dependent on another variable in the data. It can be created using the scatter() method of plotly.express.

[Video Material](https://youtu.be/qzpNzyMTDTQ)

 _Example:_
 '''import plotly.express as px

_#using the iris dataset_

df = px.data.iris()

_#plotting the scatter chart_

fig = px.scatter(df, x="species", y="petal_width")

_#showing the plot_

fig.show()'''

[Coursera_project](https://in.coursera.org/projects/data-visualization-plotly-express)