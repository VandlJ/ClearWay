terraform {
  required_providers {
    opennebula = {
      source  = "OpenNebula/opennebula"
      version = "0.4.3"
    }
  }
}

provider "opennebula" {
  username = "${var.one_username}"
  password = "${var.one_password}"
  endpoint = "${var.one_endpoint}"
}

resource "opennebula_image" "os-image" {
    name = "${var.vm_image_name}"
    datastore_id = "${var.vm_imagedatastore_id}"
    persistent = false
    path = "${var.vm_image_url}"
    permissions = "600"
}

resource "opennebula_virtual_machine" "vm" {
    count = "${var.vm_instance_count}"
    name = "vm-${count.index + 1}"
    description = "VM instance ${count.index + 1}"
    cpu = 2
    memory = 3072
    permissions = "600"
    group = "users"

    context = {
      NETWORK = "YES"
      HOSTNAME = "$NAME"
      SSH_PUBLIC_KEY = "${file(var.vm_ssh_pubkey)}"
    }

    os {
        arch = "x86_64"
        boot = "disk0"
    }

    disk {
        image_id = "${opennebula_image.os-image.id}"
        target = "vda"
        size = 12000 # 12 GB
    }

    graphics {
      listen = "0.0.0.0"
      type = "vnc"
    }

    nic {
        network_id = "${var.vm_network_id}"
    }

    connection {
      type = "ssh"
      user = "root"
      host = "${self.ip}"
    }
}