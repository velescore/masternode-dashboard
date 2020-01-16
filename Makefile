PYTHON_CMD = $(shell python --version | grep "Python 3" > /dev/null && echo "python" || (command -v python > /dev/null && echo "python3"))
PIP_CMD = $(shell pip --version | grep "python 3" > /dev/null && echo "pip" || (command -v pip3 > /dev/null && echo "pip3"))

build:
	@make assert_python_present > /dev/null
	@echo "Rebuilding from templates ..."
	@$(PYTHON_CMD) manage.py rebuild index

assert_python_present:
	@command -v $(PYTHON_CMD) > /dev/null || ( command -v apt-get > /dev/null && apt-get install -qy python3 || ("Error: Python3 is not installed" ; exit 1 ))

init:
	make assert_python_present
	@echo "Installing Python dependencies ..."
	$(PIP_CMD) install -r requirements.txt --user

test:
	@echo "Building HTML ..."
	@make build
	@echo "Validating HTML ..."
	$(PYTHON_CMD) tests/test_valid_html.py
