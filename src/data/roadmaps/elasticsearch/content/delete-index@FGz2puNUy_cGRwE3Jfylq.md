# Delete Index

Deleting an index in Elasticsearch removes the entire index and all its associated data. You can achieve this using the Delete Index API. Simply send a DELETE request to the index's name endpoint (e.g., `DELETE /your_index_name`). This action is permanent and irreversible, so it's crucial to ensure you're deleting the correct index and have a backup if needed.