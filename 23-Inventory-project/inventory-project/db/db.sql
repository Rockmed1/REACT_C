/* -- Drop all constraints from all tables */
-- DO $$
-- DECLARE
--     r record;
-- BEGIN
--   FOR r IN
--     SELECT
--       'ALTER TABLE ' || quote_ident(nspname) || '.' || quote_ident(relname) ||
--       ' DROP CONSTRAINT IF EXISTS ' || quote_ident(conname) || ';' AS sql_stmt
--     FROM
--       pg_constraint
--       INNER JOIN pg_class ON conrelid = pg_class.oid
--       INNER JOIN pg_namespace ON pg_namespace.oid = pg_class.relnamespace
-- WHERE
--   contype = 'f'
--   LOOP
--     EXECUTE r.sql_stmt;
--   END LOOP;
-- END $$;
----------
/* Show running procecesses
 */
-- SELECT
--   state,
--   datname,
--   pid,
--   query,
--   *
-- FROM
--   PG_CATALOG.PG_STAT_ACTIVITY;
----------
/* show all tables
 */
-- SELECT
--   *
-- FROM
--   information_schema.tables;
----
--
---
-- /* to see all functions and their parameter signature */
-- SELECT
--   n.nspname AS schema,
--   p.proname AS function_name,
--   PG_GET_FUNCTION_IDENTITY_ARGUMENTS(p.oid) AS args
-- FROM
--   pg_proc p
--   JOIN pg_namespace n ON n.oid = p.pronamespace
-- WHERE
--   n.nspname = 'utils'
-------
------
/* to check who has permission on a function */
-- SELECT
--   p.proname,
--   r.rolname AS grantee
-- FROM
--   pg_proc p
-- JOIN
--   pg_namespace n ON n.oid = p.pronamespace
-- CROSS JOIN
--   pg_roles r
-- WHERE
--   n.nspname = 'utils'
--   AND p.proname = '_fn_set_org_rls'
--   AND has_function_privilege(r.rolname, p.oid, 'EXECUTE');
-- SELECT
--   p.oid::REGPROCedure AS function_signature,
--   p.proname,
--   p.proacl
-- FROM pg_proc p
-- JOIN pg_namespace n ON n.oid = p.pronamespace
-- WHERE n.nspname = 'utils';
-------
------
---
-- /* show function owner */
-- SELECT
-- 	p.proname AS function_name
-- 	, p.proowner
-- 	, r.rolname AS owner_role p.*
-- FROM
-- 	pg_proc p
-- 	JOIN pg_namespace n ON n.oid = p.pronamespace
-- 	JOIN pg_roles r ON r.oid = p.proowner
-- WHERE
-- 	n.nspname = 'utils'
-- 	AND p.proname = '_fn_set_org_rls';
-----------------
----
---
-- /* check current user vs session user */
-- SET ROLE service_role;
-- SELECT
-- 	CURRENT_USER
-- 	, SESSION_USER;
-----
----
----
-- /* Default privileges per schema */
-- SELECT
--   defacl.defaclnamespace::REGNAMESPACE AS schema_name,
--   r.rolname AS grantor,
--   defacl.defaclacl AS default_privileges
-- FROM
--   pg_default_acl defacl
--   JOIN pg_roles r ON defacl.defaclrole = r.oid;
----
----
----
---
-- /* Everything granted to a role */
----
---https://www.postgresql.org/docs/8.0/functions-info.html
---
---
-- Name	Return Type	Description
-- has_table_privilege(user, table, privilege)	boolean	does user have privilege for table
-- has_table_privilege(table, privilege)	boolean	does current user have privilege for table
-- has_database_privilege(user, database, privilege)	boolean	does user have privilege for database
-- has_database_privilege(database, privilege)	boolean	does current user have privilege for database
-- has_function_privilege(user, function, privilege)	boolean	does user have privilege for function
-- has_function_privilege(function, privilege)	boolean	does current user have privilege for function
-- has_language_privilege(user, language, privilege)	boolean	does user have privilege for language
-- has_language_privilege(language, privilege)	boolean	does current user have privilege for language
-- has_schema_privilege(user, schema, privilege)	boolean	does user have privilege for schema
-- has_schema_privilege(schema, privilege)	boolean	does current user have privilege for schema
-- has_tablespace_privilege(user, tablespace, privilege)	boolean	does user have privilege for tablespace
-- has_tablespace_privilege(tablespace, privilege)	boolean	does current user have privilege for tablespace
----
-- SELECT
--   n.nspname AS schema
--   , r.rolname AS grantee
--   , HAS_SCHEMA_PRIVILEGE(r.rolname , n.nspname , 'USAGE') AS has_usage
--   , HAS_SCHEMA_PRIVILEGE(r.rolname , n.nspname , 'CREATE') AS has_create
--   -- , HAS_SCHEMA_PRIVILEGE(r.rolname , n.nspname , 'SELECT') AS has_select
--   -- , HAS_SCHEMA_PRIVILEGE(r.rolname , n.nspname , 'UPDATE') AS has_update
--   -- , HAS_SCHEMA_PRIVILEGE(r.rolname , n.nspname , 'INSERT') AS has_insert
--   -- , HAS_SCHEMA_PRIVILEGE(r.rolname , n.nspname , 'DELETE') AS has_delete
--   -- , HAS_SCHEMA_PRIVILEGE(r.rolname , n.nspname , 'EXECUTE') AS has_execute
-- FROM
--   pg_namespace n
--   , pg_roles r
-- WHERE
--   r.rolname = 'utils_admin'
--   AND n.nspname = 'utils'
-- ORDER BY
--   n.nspname;
-----
----
---
/* show all the roles that a user/role is a member of */
-- SELECT
--   rolname
-- FROM
--   pg_roles
-- WHERE
--   PG_HAS_ROLE('aa' , rolname , 'member');
-----
----
---
/* Show all schemas */
-- SELECT
-- 	*
-- FROM
-- 	information_schema.schemata;
-----
----
---


/* Copy a role definition*/
-- SELECT
-- 	*
-- FROM
-- 	pg_roles
-- WHERE
-- 	rolename = 'aa';

-- CREATE ROLE postgres LOGIN superuser INHERIT createrole createdb replication bypassrls;


-- /* get all the role membership */
-- SELECT
-- 	pg_catalog.FORMAT('GRANT %I TO %I;' , r.rolname , 'postgres')
-- FROM
-- 	pg_auth_members m
-- 	JOIN pg_roles r ON m.roleid = r.oid
-- 	JOIN pg_roles m2 ON m.member = m2.oid
-- WHERE
-- 	m2.rolname = 'aa';


-- /* copy role membership */
-- GRANT utils_admin TO postgres;


-- /* copy privilages on objects */
-- DO $$
-- DECLARE
-- 	msg TEXT;
-- BEGIN
-- 	FOR msg IN (
-- 		SELECT
-- 			FORMAT('GRANT %s ON %s.%s TO postgres;' , privilege_type , table_schema , table_name)
-- 		FROM
-- 			information_schema.role_table_grants
-- 		WHERE
-- 			grantee = 'aa')
-- 		LOOP
-- 			RAISE NOTICE 'EXCECUTING: %' , msg;
-- 			EXECUTE msg;
-- 		END LOOP;
-- END
$$
/* Revoke access of a role from a schema
 */
-- DO $$
-- DECLARE
-- 	_role TEXT;
-- 	scm TEXT;
-- BEGIN
-- 	_role = 'utils_admin';
-- 	FOR _scm IN ('auth'
-- 		-- SELECT
-- 		-- 	schema_name
-- 		-- FROM
-- 		-- 	information_schema.schemata
-- 		-- WHERE
-- 		-- 	schema_name NOT IN ('public' , 'information_schema' , 'vault' , 'extensions' , 'auth')
-- 		-- 	AND schema_name NOT LIKE 'pg%'
-- 		-- 	AND schema_name NOT LIKE 'graphql%'
-- )
-- 	LOOP
-- 		RAISE NOTICE 'schema %' , _scm;
-- 		EXECUTE FORMAT($f$ REVOKE USAGE ON SCHEMA %I FROM %I;
-- 		REVOKE CREATE ON SCHEMA %I FROM %I;
-- 	REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA %I FROM %I;
-- 	REVOKE SELECT , INSERT , UPDATE , DELETE ON ALL TABLES IN SCHEMA %I FROM %I;
-- 	REVOKE ALL ON ALL ROUTINES IN SCHEMA %I FROM %I;
-- 	REVOKE ALL ON ALL SEQUENCES IN SCHEMA %I FROM %I;
-- 	ALTER DEFAULT PRIVILEGES IN SCHEMA %I REVOKE
-- 	SELECT
-- 		, INSERT , UPDATE , DELETE ON TABLES FROM %I;
-- 	ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA %I REVOKE ALL ON ROUTINES FROM %I;
-- 	ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA %I REVOKE ALL ON FUNCTIONS FROM %I;
-- 	ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA %I REVOKE EXECUTE ON FUNCTIONS FROM %I;
-- 	$f$
-- 	, _scm
-- 	, _role
-- 	, _scm
-- 	, _role
-- 	, _scm
-- 	, _role
-- 	, _scm
-- 	, _role
-- 	, _scm
-- 	, _role
-- 	, _scm
-- 	, _role
-- 	, _scm
-- 	, _role
-- 	, _scm
-- 	, _role
-- 	, _scm
-- 	, _role
-- 	, _scm
-- 	, _role);
-- END LOOP;
-- END;
-- $$
-- LANGUAGE plpgsql;
--------------
