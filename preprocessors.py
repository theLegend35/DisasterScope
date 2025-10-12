# preprocessors.py

# Extract county column as a 2D array
def get_county_array(X):
    return X["designatedArea"].astype(str).values.reshape(-1, 1)

# Wrap each string in a list for FeatureHasher
def wrap_list(arr):
    return [[str(a[0])] for a in arr]
