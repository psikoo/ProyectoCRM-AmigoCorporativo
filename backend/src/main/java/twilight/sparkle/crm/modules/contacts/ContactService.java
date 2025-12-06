package twilight.sparkle.crm.modules.contacts;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Service
public class ContactService {
  private final ContactRepository contactRepository;

  public ContactService(ContactRepository contactRepository) {
    this.contactRepository = contactRepository;
  }

  public List<Contact> findAll() {
    return contactRepository.findAll();
  }

  public Contact save(Contact contact) {
    return contactRepository.save(contact);
  }

  public void delete(Long id) {
    contactRepository.deleteById(id);
  }

  public Contact findById(Long id) {
    return contactRepository.findById(id).orElse(null);
  }
  public Contact findFirstByName(String name) {
    return contactRepository.findFirstByName(name).orElse(null);
  }
}
