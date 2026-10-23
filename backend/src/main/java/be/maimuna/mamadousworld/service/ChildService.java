package be.maimuna.mamadousworld.service;


import be.maimuna.mamadousworld.domain.Child;
import be.maimuna.mamadousworld.repository.ChildRepository;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class ChildService {
    private final ChildRepository childRepository;

    public ChildService(ChildRepository childRepository) {
        this.childRepository = childRepository;
    }

    public Child createChild(UUID parentId, String nickname, String avatar){
        Child child= new Child();
        child.setParentId(parentId);
        child.setNickname(nickname);
        child.setAvatar(avatar);
        return childRepository.save(child);
    }


    public List<Child> listChildren(UUID parentId){
        return childRepository.findByParentId(parentId);
    }



    // existing createChild/listChildren...

    public Child getOwnedChildOrThrow(UUID childId, UUID parentId) {
        Child c = childRepository.findById(childId)
                .orElseThrow(() -> new NoSuchElementException("Child not found"));
        if (!c.getParentId().equals(parentId)) {
            // Same exception as "not found" — don't leak whether the ID exists at all
            throw new NoSuchElementException("Child not found");
        }
        return c;
    }




}
