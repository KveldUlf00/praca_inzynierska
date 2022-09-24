import pandas as pd

def transformData(file):
    nodes = []
    links = []
    data = pd.read_csv(file, sep=": ", header = None)

    for index in range(data.shape[0]) :
        nodes.append({ 'name': data[0][index] })
        for name in data[1][index].split(", "):
            links.append({ 'source': data[0][index], 'target': name})

    return {'nodes': nodes, 'links': links}





