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

  public Contact findByName(String name) {
    return contactRepository.findByName(name).orElse(null);
  }
}
