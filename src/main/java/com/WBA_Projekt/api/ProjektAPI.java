package com.WBA_Projekt.api;

import com.WBA_Projekt.classes.Projekt;
import com.WBA_Projekt.classes.Projekt_Artefakt;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Stateless
@Path("/projekt")
@TransactionManagement(TransactionManagementType.BEAN)
public class ProjektAPI {

    EntityManagerFactory ENTITY_MANAGER_FACTORY = Persistence.createEntityManagerFactory("JPA_ExamplePU");
    EntityManager em = ENTITY_MANAGER_FACTORY.createEntityManager();

    @Resource
    private UserTransaction utx;

    // Gets all the projects or if a specific project is requested returns that project
    @GET
    @Produces("application/json")
    public Response getProjects(@QueryParam("id") String id) {
        if (id == null) {
            List<Projekt> projekte = em.createNamedQuery("Projekt.findAll", Projekt.class).getResultList();
            return Response.ok(projekte).build();
        }
        try {
            Projekt projekt = em.find(Projekt.class, Integer.parseInt(id));
            if (projekt == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            return Response.ok(projekt).build();
        } catch (NumberFormatException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    // Adds a new project
    @POST
    @Consumes("application/json")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addProject(Projekt projekt) throws SystemException {
        // Check if the project already exists
        Projekt existingProject = em.find(Projekt.class, projekt.getProjektID());
        if (existingProject != null) {
            return Response.status(Response.Status.CONFLICT).build();
        }
        // Check if the project is valid
        if (projekt.getName() == null || projekt.getBeschreibung() == null ||
                projekt.getBeschreibung().length() > 255 || projekt.getStartDate() == null ||
                projekt.getLogoPath() == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        // Add the project
        try {
            utx.begin();
            em.persist(projekt);
            utx.commit();
        } catch (Exception e) {
            utx.rollback();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    // Updates a project
    @PATCH
    @Consumes("application/json")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateProject(Projekt projekt) throws SystemException {
        // Check if the project already exists
        Projekt existingProject = em.find(Projekt.class, projekt.getProjektID());
        if (existingProject == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        // Check if the projekt is valid
        if (projekt.getBeschreibung().length() > 255) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        // Update the project
        try {
            utx.begin();
            em.merge(projekt);
            utx.commit();
        } catch (Exception e) {
            utx.rollback();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        // Get the updated project
        Projekt updatedProject = em.find(Projekt.class, projekt.getProjektID());
        return Response.ok(updatedProject).build();
    }

    // Deletes a project
    @DELETE
    @Consumes("application/json")
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response deleteProject(@PathParam("id") String id) throws SystemException {
        // Check if the project already exists
        try {
            Projekt existingProject = em.find(Projekt.class, Integer.parseInt(id));
            if (existingProject == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            // Delete the project
            try {
                utx.begin();
                em.remove(existingProject);
                utx.commit();
            } catch (Exception e) {
                utx.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
            return Response.status(Response.Status.NO_CONTENT).build();
        } catch (NumberFormatException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    // Add Artefact to Project
    @POST
    @Path("/{id}/artefact")
    @Consumes("application/json")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addArtefact(@PathParam("id") String id, Projekt_Artefakt projekt_Artefakt) {
        // Check if the project already exists
        try {
            Projekt existingProject = em.find(Projekt.class, Integer.parseInt(id));
            if (existingProject == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            // Check if the artefact already exists
            Projekt_Artefakt existingArtefact = em.find(Projekt_Artefakt.class, projekt_Artefakt.getArtefaktId());
            if (existingArtefact != null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            // Check if the artefact is valid
            if (projekt_Artefakt.getArbeitszeit() < 0) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

            // Add the artefact
            try {
                utx.begin();
                em.persist(projekt_Artefakt);
                utx.commit();
            } catch (Exception e) {
                utx.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
            // Get the updated project
            return Response.status(Response.Status.NO_CONTENT).build();
        } catch (NumberFormatException | SystemException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    // Delete Artefact from Project
    @DELETE
    @Path("/{id}/artefact/{aid}")
    @Consumes("application/json")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteArtefact(@PathParam("id") String id, @PathParam("aid") String aid) throws SystemException {
        // Check if the Project_Artefakt exists
        try {
            Projekt_Artefakt existingRelation = em.find(Projekt_Artefakt.class, Integer.parseInt(aid));
            if (existingRelation == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            // Delete the Project_Artefakt
            try {
                utx.begin();
                em.remove(existingRelation);
                utx.commit();
            } catch (Exception e) {
                utx.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
            return Response.status(Response.Status.NO_CONTENT).build();
        } catch (NumberFormatException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }
}
