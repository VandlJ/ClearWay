import pandas as pd
import geopandas as gpd
import sys
import os
from shapely.geometry import Point, LineString

def load_csv(file_path):
    """Load CSV file into a DataFrame."""
    return pd.read_csv(file_path)

def load_geojson(file_path):
    """Load GeoJSON file into a GeoDataFrame."""
    return gpd.read_file(file_path)

def snap_to_nearest_road(gps_point, road_lines):
    """
    Find the nearest point on the road network for a given GPS point.
    
    Args:
        gps_point (Point): The original GPS coordinate.
        road_lines (GeoSeries): A collection of road LineString geometries.
    
    Returns:
        Point: The snapped point on the closest road.
    """
    closest_point = None
    min_distance = float("inf")

    for road in road_lines:
        nearest_point = road.interpolate(road.project(gps_point))  # Get the closest point on the line
        distance = gps_point.distance(nearest_point)  # Compute the distance

        if distance < min_distance:
            min_distance = distance
            closest_point = nearest_point

    return closest_point if closest_point else gps_point  # Return original if no snap found

def process_and_save(input_csv, output_csv, roads):
    """Process CSV file, adjust GPS coordinates, and save results."""
    df = load_csv(input_csv)
    
    # Convert GPS coordinates to Shapely Points
    df["geometry"] = df.apply(lambda row: Point(row["GPS2"], row["GPS1"]), axis=1)

    # Snap each point to the nearest road
    df["snapped_geometry"] = df["geometry"].apply(lambda point: snap_to_nearest_road(point, roads))

    # Extract new lat/lon
    df["GPS1"] = df["snapped_geometry"].apply(lambda p: p.y)  # Latitude
    df["GPS2"] = df["snapped_geometry"].apply(lambda p: p.x)  # Longitude

    # Save back to CSV without geometry columns
    df.drop(columns=["geometry", "snapped_geometry"], inplace=True)
    df.to_csv(output_csv, index=False)
    print(f"Processed {input_csv} -> {output_csv}")

def main(input_file):
    # Load road network from GeoJSON
    road_network = load_geojson("./preproccessing/plzen_cesty.json")

    # Extract LineString geometries
    road_lines = road_network["geometry"]

    # Process both max_values and min_values CSV files
    process_and_save("./preproccessing/max_" + input_file, "./preproccessing/max_"+ os.path.splitext(input_file)[0] +"_snapped.csv", road_lines)
    process_and_save("./preproccessing/min_" + input_file, "./preproccessing/min_" + os.path.splitext(input_file)[0] + "_snapped.csv", road_lines)

if __name__ == "__main__":
    input_file = sys.argv[1]
    main(input_file)