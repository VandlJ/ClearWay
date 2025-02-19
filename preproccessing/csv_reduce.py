import pandas as pd
import numpy as np
import sys
import os


def process_csv(input_file):
    base_name = os.path.splitext(os.path.basename(input_file))[0]

    # Načtení CSV souboru
    df = pd.read_csv(input_file)
    
    # Zaokrouhlení GPS souřadnic na 4 desetinná místa
    df['GPS1'] = df['GPS1'].round(4)
    df['GPS2'] = df['GPS2'].round(4)
    
    # Výpočet součtu A, B, C pro každý řádek
    df['sum_ABC'] = df['A'] + df['B'] + df['C']
    
    # Seskupení podle času a vytvoření dvou dataframů
    min_sum = df.groupby('time').agg({
        'GPS1': 'first',
        'GPS2': 'first',
        'sum_ABC': 'min'
    }).reset_index()
    
    max_sum = df.groupby('time').agg({
        'GPS1': 'first',
        'GPS2': 'first',
        'sum_ABC': 'max'
    }).reset_index()
    
    min_output_file = f"./preproccessing/min_{base_name}.csv"
    max_output_file = f"./preproccessing/max_{base_name}.csv"
    
    # Save results to new CSV files
    min_sum.to_csv(min_output_file, index=False)
    max_sum.to_csv(max_output_file, index=False)
    
    print(f"Processed {len(df)} rows")
    print(f"Created {len(min_sum)} unique time records")
    print(f"Files {min_output_file} and {max_output_file} were created")

    print("Files in the current folder:")
    print(os.listdir("./preproccessing"))


if __name__ == "__main__":
    input_file = sys.argv[1]
    process_csv(input_file)