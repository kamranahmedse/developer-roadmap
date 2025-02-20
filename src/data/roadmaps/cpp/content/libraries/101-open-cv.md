# OpenCV

**OpenCV (Open Source Computer Vision Library)** is an open-source computer vision and machine learning software library. It was built to provide a common infrastructure for computer vision applications and to accelerate the use of machine perception in commercial products. OpenCV contains over 2,500 optimized algorithms for real-time computer vision and is actively used by a large community of programmers, researchers, and industries worldwide.

The library has interfaces for C++, Python, Java, and MATLAB/Octave, and is widely used in various computer vision fields, such as:

- 2D and 3D image processing
- Facial recognition and face detection
- Object detection and recognition
- Machine learning

Here's a simple example using OpenCV in C++ to read and display an image:

**Prerequisite**: Install OpenCV for C++ on your system (e.g., by following the [official installation guide](https://docs.opencv.org/master/d7/d9f/tutorial_linux_install.html)).

```cpp
#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <iostream>

int main(int argc, char** argv) {
    if (argc != 2) {
        std::cout << "Usage: display_image ImageToLoadAndDisplay" << std::endl;
        return -1;
    }

    cv::Mat image;
    image = cv::imread(argv[1], cv::IMREAD_COLOR);

    if (!image.data) {
        std::cout << "Could not open or find the image" << std::endl;
        return -1;
    }

    cv::namedWindow("Display window", cv::WINDOW_AUTOSIZE);
    cv::imshow("Display window", image);
    cv::waitKey(0);

    return 0;
}
```

This example reads an image from the given input path (`argv[1]`) and displays it in a window. The `cv::imread()` function is used to read the image, and the `cv::imshow()` function displays it in the created window.

Remember to compile the code, linking the necessary libraries:

```
g++ -o display_image display_image.cpp `pkg-config --cflags --libs opencv4`
```

And run the executable with an image path as an argument:

```
./display_image path/to/image.jpg
```

For more advanced examples and detailed documentation on how to use OpenCV, please visit the [official OpenCV documentation](https://docs.opencv.org/master/).