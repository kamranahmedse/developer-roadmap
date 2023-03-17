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
[Website](https://www.kaggle.com/code/kanncaa1/plotly-tutorial-for-beginners)

## Some plotes in plotly 
    1.Line Charts
    2.Scatter Charts
    3.Bar Charts
    4.Pie Charts
    5.Bubble Charts

# _Line plot_

_Line Charts Example_: Citation and Teaching vs World Rank of Top 100 Universities

>Import graph_objs as go
>Creating traces
    >x = x axis
    >y = y axis
    >mode = type of plot like marker, line or line + markers
    >name = name of the plots
    >marker = marker is used with dictionary.
        >>color = color of lines. It takes RGB (red, green, blue) and opacity (alpha)
    >text = The hover text (hover is curser)
>data = is a list that we add traces into it
>layout = it is dictionary.
    >title = title of layout
    >x axis = it is dictionary
        >title = label of x axis
        >ticklen = length of x axis ticks
        >zeroline = showing zero line or not
>fig = it includes data and layout
>iplot() = plots the figure(fig) that is created by data and layout
 [youtube](https://youtu.be/c6gVnZ0cmqM)

# Scatter Charts

A **scatter plot** is a set of dotted points to represent individual pieces of data in the horizontal and vertical axis. A graph in which the values of two variables are plotted along X-axis and Y-axis, the pattern of the resulting points reveals a correlation between them.

[youtube](https://youtu.be/8UX0BE405Vg)

_Example:_
 '''import plotly.express as px

# using the iris dataset
df = px.data.iris()

# plotting the scatter chart
fig = px.scatter(df, x="species", y="petal_width")

# showing the plot
fig.show()'''

# Bar chart 

A **bar chart** is a pictorial representation of data that presents categorical data with rectangular bars with heights or lengths proportional to the values that they represent. In other words, it is the pictorial representation of dataset. These data sets contain the numerical values of variables that represent the length or height.

[youtube](https://youtu.be/oz7sg5NW4WU)

_Example:_
'''import plotly.express as px

# using the iris dataset
df = px.data.iris()

# plotting the bar chart
fig = px.bar(df, x="sepal_width", y="sepal_length")

# showing the plot
fig.show()'''

# Pie chart

A **pie chart** is a circular statistical graphic, which is divided into slices to illustrate numerical proportions. It depicts a special chart that uses “pie slices”, where each sector shows the relative sizes of data. A circular chart cuts in a form of radii into segments describing relative frequencies or magnitude also known as circle graph.

[youtube](https://youtu.be/7o6Aqp6kjTg)

_Example:_
'''import plotly.express as px

# using the tips dataset
df = px.data.tips()

# plotting the pie chart
fig = px.pie(df, values="total_bill", names="day")

# showing the plot
fig.show()'''

# Bubble chart

A **bubble plot** is a scatter plot with bubbles (color-filled circles). Bubbles have various sizes dependent on another variable in the data. It can be created using the scatter() method of plotly.express.

[youtube](https://youtu.be/qzpNzyMTDTQ)

 _Example:_
 '''import plotly.express as px

# using the iris dataset
df = px.data.iris()

# plotting the scatter chart
fig = px.scatter(df, x="species", y="petal_width")

# showing the plot
fig.show()'''