var documenterSearchIndex = {"docs":
[{"location":"#Numerical-Data","page":"Numerical Data","title":"Numerical Data","text":"","category":"section"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"StateSpaceSets","category":"page"},{"location":"#StateSpaceSets","page":"Numerical Data","title":"StateSpaceSets","text":"StateSpaceSets.jl\n\n(Image: ) (Image: ) (Image: ) (Image: CI) (Image: codecov) (Image: Package Downloads)\n\nA Julia package that provides functionality for state space sets. These are collections of points of fixed, and known by type, size (called dimension). It is used in several projects in the JuliaDynamics organization, such as DynamicalSystems.jl or CausalityTools.jl.\n\nThe main export of StateSpaceSets is the concrete type StateSpaceSet. The package also provides functionality for distances, neighbor searches, sampling, and normalization.\n\nTo install it you may run import Pkg; Pkg.add(\"StateSpaceSets\"), however, there is no real reason to install this package directly as it is re-exported by all downstream packages that use it.\n\npreviously StateSpaceSets.jl was part of DelayEmbeddings.jl\n\n\n\n\n\n","category":"module"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"info: Timeseries and datasets\nThe word \"timeseries\" can be confusing, because it can mean a univariate (also called scalar or one-dimensional) timeseries or a multivariate (also called multi-dimensional) timeseries. To resolve this confusion, in DynamicalSystems.jl we have the following convention: \"timeseries\" is always univariate! it refers to a one-dimensional vector of numbers, which exists with respect to some other one-dimensional vector of numbers that corresponds to a time vector. On the other hand, we use the word \"dataset\" is used to refer to a multi-dimensional timeseries, which is of course simply a group/set of one-dimensional timeseries represented as a StateSpaceSet. In some documentation strings we use the word \"trajectory\" instead of \"dataset\", which means an ordered multivariate timeseries. This is typically the output of the function trajectory, or the delay embedding of a timeseries via embed, both of which are also represented as a StateSpaceSet.","category":"page"},{"location":"#StateSpaceSet","page":"Numerical Data","title":"StateSpaceSet","text":"","category":"section"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"Trajectories, and in general sets in state space, are represented by a structure called StateSpaceSet in DynamicalSystems.jl (while timeseries are always standard Julia Vectors). It is recommended to always standardize datasets.","category":"page"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"StateSpaceSet\nstandardize","category":"page"},{"location":"#StateSpaceSets.StateSpaceSet","page":"Numerical Data","title":"StateSpaceSets.StateSpaceSet","text":"StateSpaceSet{D, T} <: AbstractStateSpaceSet{D,T}\n\nA dedicated interface for sets in a state space. It is an ordered container of equally-sized points of length D. Each point is represented by SVector{D, T}. The data are a standard Julia Vector{SVector}, and can be obtained with vec(ssset::StateSpaceSet). Typically the order of points in the set is the time direction, but it doesn't have to be.\n\nWhen indexed with 1 index, StateSpaceSet is like a vector of points. When indexed with 2 indices it behaves like a matrix that has each of the columns be the timeseries of each of the variables. When iterated over, it iterates over its contained points. See description of indexing below for more.\n\nStateSpaceSet also supports almost all sensible vector operations like append!, push!, hcat, eachrow, among others.\n\nDescription of indexing\n\nIn the following let i, j be integers, typeof(X) <: AbstractStateSpaceSet and v1, v2 be <: AbstractVector{Int} (v1, v2 could also be ranges, and for performance benefits make v2 an SVector{Int}).\n\nX[i] == X[i, :] gives the ith point (returns an SVector)\nX[v1] == X[v1, :], returns a StateSpaceSet with the points in those indices.\nX[:, j] gives the jth variable timeseries (or collection), as Vector\nX[v1, v2], X[:, v2] returns a StateSpaceSet with the appropriate entries (first indices being \"time\"/point index, while second being variables)\nX[i, j] value of the jth variable, at the ith timepoint\n\nUse Matrix(ssset) or StateSpaceSet(matrix) to convert. It is assumed that each column of the matrix is one variable. If you have various timeseries vectors x, y, z, ... pass them like StateSpaceSet(x, y, z, ...). You can use columns(dataset) to obtain the reverse, i.e. all columns of the dataset in a tuple.\n\n\n\n\n\n","category":"type"},{"location":"#StateSpaceSets.standardize","page":"Numerical Data","title":"StateSpaceSets.standardize","text":"standardize(d::StateSpaceSet) → r\n\nCreate a standardized version of the input set where each column is transformed to have mean 0 and standard deviation 1.\n\n\n\n\n\nstandardize(x::AbstractVector{<:Real}) = (x - mean(x))/std(x)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"In essence a StateSpaceSet is simply a wrapper for a Vector of SVectors. However, it is visually represented as a matrix, similarly to how numerical data would be printed on a spreadsheet (with time being the column direction). It also offers a lot more functionality than just pretty-printing. Besides the examples in the documentation string, you can e.g. iterate over data points","category":"page"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"using DynamicalSystems\nhen = Systems.henon()\ndata = trajectory(hen, 10000) # this returns a dataset\nfor point in data\n    # stuff\nend","category":"page"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"Most functions from DynamicalSystems.jl that manipulate and use multidimensional data are expecting a StateSpaceSet. This allows us to define efficient methods that coordinate well with each other, like e.g. embed.","category":"page"},{"location":"#StateSpaceSet-Functions","page":"Numerical Data","title":"StateSpaceSet Functions","text":"","category":"section"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"minima\nmaxima\nminmaxima\ncolumns","category":"page"},{"location":"#StateSpaceSets.minima","page":"Numerical Data","title":"StateSpaceSets.minima","text":"minima(dataset)\n\nReturn an SVector that contains the minimum elements of each timeseries of the dataset.\n\n\n\n\n\n","category":"function"},{"location":"#StateSpaceSets.maxima","page":"Numerical Data","title":"StateSpaceSets.maxima","text":"maxima(dataset)\n\nReturn an SVector that contains the maximum elements of each timeseries of the dataset.\n\n\n\n\n\n","category":"function"},{"location":"#StateSpaceSets.minmaxima","page":"Numerical Data","title":"StateSpaceSets.minmaxima","text":"minmaxima(dataset)\n\nReturn minima(dataset), maxima(dataset) without doing the computation twice.\n\n\n\n\n\n","category":"function"},{"location":"#StateSpaceSets.columns","page":"Numerical Data","title":"StateSpaceSets.columns","text":"columns(ssset) -> x, y, z, ...\n\nReturn the individual columns of the state space set allocated as Vectors. Equivalent with collect(eachcol(ssset)).\n\n\n\n\n\n","category":"function"},{"location":"#StateSpaceSet-distances","page":"Numerical Data","title":"StateSpaceSet distances","text":"","category":"section"},{"location":"#Two-datasets","page":"Numerical Data","title":"Two datasets","text":"","category":"section"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"set_distance\nHausdorff\nCentroid","category":"page"},{"location":"#StateSpaceSets.set_distance","page":"Numerical Data","title":"StateSpaceSets.set_distance","text":"set_distance(ssset1, ssset2 [, distance])\n\nCalculate a distance between two StateSpaceSets, i.e., a distance defined between sets of points, as dictated by distance.\n\nPossible distance types are:\n\nCentroid, which is the default, and 100s of times faster than the rest\nHausdorff\nStrictlyMinimumDistance\n\n\n\n\n\n","category":"function"},{"location":"#StateSpaceSets.Hausdorff","page":"Numerical Data","title":"StateSpaceSets.Hausdorff","text":"Hausdorff(metric = Euclidean())\n\nA distance that can be used in set_distance. The Hausdorff distance is the greatest of all the distances from a point in one set to the closest point in the other set. The distance is calculated with the metric given to Hausdorff which defaults to Euclidean.\n\nHausdorff is 2x slower than StrictlyMinimumDistance, however it is a proper metric in the space of sets of state space sets.\n\n\n\n\n\n","category":"type"},{"location":"#StateSpaceSets.Centroid","page":"Numerical Data","title":"StateSpaceSets.Centroid","text":"Centroid(metric = Euclidean())\n\nA distance that can be used in set_distance. The Centroid method returns the distance (according to metric) between the centroids (a.k.a. centers of mass) of the sets.\n\nmetric can be any function that takes in two static vectors are returns a positive definite number to use as a distance (and typically is a Metric from Distances.jl).\n\n\n\n\n\n","category":"type"},{"location":"#Sets-of-datasets","page":"Numerical Data","title":"Sets of datasets","text":"","category":"section"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"setsofsets_distances","category":"page"},{"location":"#StateSpaceSets.setsofsets_distances","page":"Numerical Data","title":"StateSpaceSets.setsofsets_distances","text":"setsofsets_distances(a₊, a₋ [, distance]) → distances\n\nCalculate distances between sets of StateSpaceSets. Here  a₊, a₋ are containers of StateSpaceSets, and the returned distances are dictionaries of distances. Specifically, distances[i][j] is the distance of the set in the i key of a₊ to the j key of a₋. Notice that distances from a₋ to a₊ are not computed at all (assumming symmetry in the distance function).\n\nThe distance can be as in set_distance, or it can be an arbitrary function that takes as input two state space sets and returns any positive-definite number as their \"distance\".\n\n\n\n\n\n","category":"function"},{"location":"#StateSpaceSet-I/O","page":"Numerical Data","title":"StateSpaceSet I/O","text":"","category":"section"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"Input/output functionality for an AbstractStateSpaceSet is already achieved using base Julia, specifically writedlm and readdlm. To write and read a dataset, simply do:","category":"page"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"using DelimitedFiles\n\ndata = StateSpaceSet(rand(1000, 2))\n\n# I will write and read using delimiter ','\nwritedlm(\"data.txt\", data, ',')\n\n# Don't forget to convert the matrix to a StateSpaceSet when reading\ndata = StateSpaceSet(readdlm(\"data.txt\", ',', Float64))","category":"page"},{"location":"#Neighborhoods","page":"Numerical Data","title":"Neighborhoods","text":"","category":"section"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"Neighborhoods refer to the common act of finding points in a dataset that are nearby a given point (which typically belongs in the dataset). DynamicalSystems.jl bases this interface on Neighborhood.jl. You can go to its documentation if you are interested in finding neighbors in a dataset for e.g. a custom algorithm implementation.","category":"page"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"For DynamicalSystems.jl, what is relevant are the two types of neighborhoods that exist:","category":"page"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"NeighborNumber\nWithinRange","category":"page"},{"location":"#Neighborhood.NeighborNumber","page":"Numerical Data","title":"Neighborhood.NeighborNumber","text":"NeighborNumber(k::Int) <: SearchType\n\nSearch type representing the k nearest neighbors of the query (or approximate neighbors, depending on the search structure).\n\n\n\n\n\n","category":"type"},{"location":"#Neighborhood.WithinRange","page":"Numerical Data","title":"Neighborhood.WithinRange","text":"WithinRange(r::Real) <: SearchType\n\nSearch type representing all neighbors with distance ≤ r from the query (according to the search structure's metric).\n\n\n\n\n\n","category":"type"},{"location":"#Theiler-window","page":"Numerical Data","title":"Theiler window","text":"","category":"section"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"The Theiler window is a concept that is useful when finding neighbors in a dataset that is coming from the sampling of a continuous dynamical system. As demonstrated in the figure below, it tries to eliminate spurious \"correlations\" (wrongly counted neighbors) due to a potentially dense sampling of the trajectory (e.g. by giving small sampling time in trajectory).","category":"page"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"The figure below demonstrates a typical WithinRange search around the black point with index i. Black, red and green points are found neighbors, but points within indices j that satisfy |i-j| ≤ w should not be counted as \"true\" neighbors. These neighbors are typically the same around any state space point, and thus wrongly bias calculations by providing a non-zero baseline of neighbors. For the sketch below, w=3 would have been used.","category":"page"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"Typically a good choice for w coincides with the choice an optimal delay time, see estimate_delay, for any of the timeseries of the dataset.","category":"page"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"(Image: )","category":"page"},{"location":"#Samplers","page":"Numerical Data","title":"Samplers","text":"","category":"section"},{"location":"","page":"Numerical Data","title":"Numerical Data","text":"statespace_sampler","category":"page"},{"location":"#StateSpaceSets.statespace_sampler","page":"Numerical Data","title":"StateSpaceSets.statespace_sampler","text":"statespace_sampler(region [, seed = 42]) → sampler, isinside\n\nA function that facilitates sampling points randomly and uniformly in a state space region. It generates two functions:\n\nsampler is a 0-argument function that when called generates a random point inside a state space region. The point is always a Vector for type stability irrespectively of dimension. Generally, the generated point should be copied if it needs to be stored. (i.e., calling sampler() utilizes a shared vector) sampler is a thread-safe function.\nisinside is a 1-argument function that returns true if the given state space point is inside the region.\n\nThe region can be an instance of any of the following types (input arguments if not specified are vectors of length D, with D the state space dimension):\n\nHSphere(radius::Real, center): points inside the hypersphere (boundary excluded). Convenience method HSphere(radius::Real, D::Int) makes the center a D-long vector of zeros.\nHSphereSurface(radius, center): points on the hypersphere surface. Same convenience method as above is possible.\nHRectangle(mins, maxs): points in [min, max) for the bounds along each dimension.\n\nThe random number generator is always Xoshiro with the given seed.\n\n\n\n\n\nstatespace_sampler(grid::NTuple{N, AbstractRange} [, seed])\n\nIf given a grid that is a tuple of AbstractVectors, the minimum and maximum of the vectors are used to make an HRectangle region.\n\n\n\n\n\n","category":"function"}]
}
