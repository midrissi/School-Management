﻿/**Name : AdministratorDescription : is a person who is responsible to produce the timetable for each teacher and classroom by providing the necessary parameters.*/(function(){	var	ERRORS			= __myNameSpace.ERRORS,	__Administrator	= model.Administrator 		= {},	__events		= __Administrator.events 	= new __myNameSpace.Model.User.Events(),	ROLES			= __myNameSpace.ROLES,	directoryROLES	= __myNameSpace.DirectoryROLES;		__events.onRestrictingQuery = function(){		var		sessionRef		= currentSession(),		curUser			= sessionRef.user,		sStorage		= sessionStorage;				if(sessionRef.belongsTo(directoryROLES.SUPERADMINISTRATOR)){			return this.query('role = :1' , ROLES.ADMINISTRATOR);		}				if(sessionRef.belongsTo(directoryROLES.ADMINISTRATOR)){			return this.query('ID = :1' , sStorage.ID);		}				return this.createEntityCollection();	}		__events.onValidate = function(){		var		sessionRef		= currentSession(),		curUser			= sessionRef.user,		sStorage		= sessionStorage;				if(!sessionRef.belongsTo(directoryROLES.SUPERADMINISTRATOR)){			if(this.ID != sStorage.ID){				return ERRORS.Model.Administrator.updateAnotherAdmin;			}		}	}})();