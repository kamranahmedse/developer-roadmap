A full-stack application includes one or more web pages, a backend (which usually involve microservices) and some sort of storage engine (i.e a database).  
To deploy all of that together, you have to:

1. **Prepare the Application**: Build the frontend (e.g., using `npm run build`). Ensure the back-end is production-ready (e.g., environment variables, database setup).  
2. **Deploy Frontend**: Push the code into the servers, usually something like AWS S3, GCP Cloud Storage, or Firebase Hosting to host static files. Configure a CDN (e.g., CloudFront) if needed for static content.  
3. **Deploy Back-End**: Use cloud services like AWS EC2, GCP Compute Engine, or a managed platform like AWS Elastic Beanstalk. Set up environment variables and connect to the database (e.g., RDS, Cloud SQL).  
4. **Database**: Use a managed database service (e.g., RDS, Firestore) for scalability, or deploy an on-prem database on your server.  
5. **DNS and SSL**: Configure a custom domain and HTTPS using AWS Route 53, GCP Domains, or another provider. 